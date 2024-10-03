from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi import UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import io
import re
import shutil
import os
import fitz  # PyMuPDF
import nltk
from nltk.tokenize import sent_tokenize
import logging
import json  # Added to fix the NameError
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI
from typing import List
from tqdm import tqdm
from openai import OpenAI, AuthenticationError
import base64

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

nltk.download('punkt')

os.environ["OPENAI_API_KEY"] = "your_openai_api_key"

# Constants
top_k_docs = 3
split_size = 15
overlap = 1


# Setup logger
logger = logging.getLogger('langchain_logger')
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)

vectorstore = None
chunked_datas = None
openaiKey_uploaded = None
upload_files_response = None



def load_from_text(fstarter: str, text: str, split_size: int, overlap: int):
    text = sent_tokenize(text)
    i = 0
    data = []
    while i < len(text):
        splits = [fstarter]
        splits.extend(text[i:i + split_size])
        data.append(" ".join(splits))
        i = i + (split_size - overlap)

    return data


async def extract_text_from_pdf(upload_file):
    content = await upload_file.read()  # 读取文件内容为二进制数据
    with fitz.open("pdf", content) as doc:  # 使用二进制数据打开PDF
        # 提取PDF文本的逻辑
        text = ""
        for page in doc:
            text += page.get_text()
    return text


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


manager = ConnectionManager()


@app.post("/upload")
#
async def upload_files(files: List[UploadFile] = File(...), openaiKey: str = Form(...)):
    global openaiKey_uploaded
    global chunked_datas
    global upload_files_response
    responses = []
    Is_openaiKey_Vaild=True
    client = OpenAI(
        api_key=openaiKey
    )
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": "Say this is a test",
                }
            ],
            model="gpt-3.5-turbo",
        )  # 如果没有错误，返回 True 表示密钥有效
    except AuthenticationError as e:
        Is_openaiKey_Vaild=False
        print("OPENAI KEY AuthenticationError")
        upload_files_response = f"Authentication error: {str(e)}"
        error_str = str(e)
        match = re.search(r"'message': '([^']*)'", error_str)
        if match:
            message = match.group(1)
        else:
            message = "Authentication failed. Please check your API key."

        return JSONResponse(content={"message": f"{message}", "details": "ERROR"})
    except Exception as e:
        Is_openaiKey_Vaild = False
        print("OPENAI KEY Exception")
        upload_files_response = f"Other error: {str(e)}"
        return JSONResponse(content={"message": f"Error Code 500 : Other error: {str(e)}", "details": "ERROR"})


    responses.append(f"Is_OpenAIKey_Vaild:{Is_openaiKey_Vaild}")
    files_uploaded = files
    openaiKey_uploaded = openaiKey
    print("files_uploaded", files_uploaded)
    print("openaiKey", openaiKey)

    # responses.append(f"OpenaiKey {openaiKey}")
    # return JSONResponse(content={"message": "Files processed successfully", "details": responses})

    chunked_datas = []
    for i in tqdm(files_uploaded):
        datas = await extract_text_from_pdf(i)  # 确保使用await来调用异步函数
        a = load_from_text(i.filename, datas, split_size, overlap)
        chunked_datas.append(a)
        responses.append(f"Processed file {i.filename}")

    upload_files_response=f"Files processed successfully, {responses}"
    return JSONResponse(content={"message": f"Files processed successfully {responses}", "details": "INFO" })


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    global vectorstore
    global chunked_datas
    global openaiKey_uploaded
    global upload_files_response
    await manager.connect(websocket)
    try:
        while True:
            #if upload_files_response:
            #    await websocket.send_text(upload_files_response)
            #    upload_files_response = None

            data = await websocket.receive_text()
            #print("Vectorstore:", vectorstore)
            #print("Received data:", data)
            # print("Chunked_datas:",chunked_datas)
            message = json.loads(data)
            action = message.get('action')
            if action == "vectorize":
                await vectorize_documents(websocket)
            elif action == "handle_query":
                await handle_query(websocket, message.get('query'))
            elif action == "delete_local":
                await delete_local(websocket)
            else:
                await manager.send_personal_message("Unrecognized action", websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        print("Client disconnected")  # This can help understand disconnections

async def delete_local(websocket):

    await websocket.send_text("> Trying to delete local Vectorstore")

    directory_path = "./content/faiss_db"
    if not os.path.exists(directory_path):
        await websocket.send_text(
            "Error: Cannot find local Vectorstore. Your local Vectorstore is empty.")
        return

    try:
        shutil.rmtree(directory_path)
        await websocket.send_text("> Local Vectorstore deleted successfully.")
    except Exception as e:
        await websocket.send_text(f"> Failed to delete local Vectorstore: {str(e)}")

async def vectorize_documents(websocket):
    global vectorstore
    global chunked_datas
    global openaiKey_uploaded
    if openaiKey_uploaded is None:
        openaiKey_uploaded='sk-proj-9OwYFagHZTP6OWLwr2qWT3BlbkFJsAcLEh1cf6Dgt5hEPvjx'
    
    flattened_chunked_datas = [item for sublist in chunked_datas for item in sublist]
    
    # Assumed additional functionality here to use the OpenAI API key
    await websocket.send_text("> Embedding data using text-embedding-3-large...")
    embeddings = OpenAIEmbeddings(model="text-embedding-3-large",
                                  api_key=openaiKey_uploaded)  # Use the provided API key

    directory_path = "./content/faiss_db"

    if not os.path.exists(directory_path):
        os.makedirs(directory_path)

    vectorstore = FAISS.from_texts(flattened_chunked_datas, embedding=embeddings)
    vectorstore.save_local(folder_path=directory_path, index_name="AAAIndex")

    #print(vectorstore)
    await websocket.send_text("Vectorization complete")


async def handle_query(websocket, query):
    global openaiKey_uploaded

    if openaiKey_uploaded is None:
        openaiKey_uploaded='sk-proj-9OwYFagHZTP6OWLwr2qWT3BlbkFJsAcLEh1cf6Dgt5hEPvjx'
    os.environ["OPENAI_API_KEY"] = openaiKey_uploaded
    directory_path = "./content/faiss_db"
    if not os.path.exists(directory_path):
        await websocket.send_text("Error: Can not find local Vectorstore. Please upload file(s) and vectorize them first")
        return
    await websocket.send_text("> Entering new RetrievalQA chain...")
    # await websocket.send_text(f"Query : {query}")
    # await websocket.send_text(f"Type Query : {type(query)}")
    embeddings = OpenAIEmbeddings(model="text-embedding-3-large",
                                  api_key=openaiKey_uploaded)

    vectorstore= FAISS.load_local(folder_path=directory_path,
                                  embeddings=embeddings,
                                  index_name="AAAIndex",
                                  allow_dangerous_deserialization=True)
    await websocket.send_text("> Loading from Local Vectorstore ...")


    # global vectorstore
    # if not vectorstore:
    #     await websocket.send_text("Error: Data not vectorized yet.")
    #     return

    llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.7, max_retries=10)
    retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": top_k_docs})
    await websocket.send_text("> Finished chain.")
    print("Retriever:", retriever)
    await websocket.send_text("> Generating Answer... Waiting for response from OpenAI...")
    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        verbose=True,
        return_source_documents=True
    )

    result = qa(query)
    await websocket.send_text(f"Query result: {result['result']}")

# uvicorn command remains the same
# uvicorn filename:app --reload

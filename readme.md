# Installation Guide

1. Go to [Node.js Download](https://nodejs.org/en/download/package-manager), choose version 16.20.2, and please follow the instructions to install npm & node on your computer.

2. Go to [Python 3.9.6 Download](https://www.python.org/downloads/release/python-396/), download Python 3.9.6 ( other ven1ersions may work as well).

3. Open the "RAGv4" folder in the terminal, and enter the following command:
   ```bash
   pip install fastapi "uvicorn[standard]" python-multipart PyMuPDF nltk aiofiles langchain_openai langchain_community langchain tqdm openai faiss-cpu
   ```
   ```bash
   cd backend
   ```
   ```bash
   uvicorn main:app --reload
   ```

5. Open the "RAGv4" folder in a new terminal and enter the following command:
   ```bash
   cd frontend
   ```
   ```bash
   npm install
   ```
    ```bash
    npm start
    ```

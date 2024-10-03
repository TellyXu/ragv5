import React, { useState, useEffect } from "react";
import {
    Button, Card, CardBody, Container, Row, Col,
    FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup,
    Label
} from "reactstrap";
import ScrollTransparentNavbar from "../components/Navbars/ScrollTransparentNavbar";
import FooterBlack from "../components/Footers/FooterBlack";
import svg1 from '../assets/svg/openai.svg';
import axios from 'axios';
import MessageDisplay from "../components/Log_pseudo_terminal/log";

function ContactUs() {
    const [openaiKey, setOpenAIKey] = useState('');
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);
    const [files, setFiles] = useState([]);


    useEffect(() => {
        document.title = 'RAG - OPENAI | CDHAI';
        const websocket = new WebSocket('ws://127.0.0.1:8000/ws');
        setWs(websocket);
        websocket.onopen = () => console.log('WebSocket Connected');
        websocket.onmessage = (event) => {
            console.log('Message from WebSocket:', event.data);
            setMessages(prev => [...prev, event.data]);
        };
        websocket.onerror = (error) => console.log('WebSocket Error:', error);
        websocket.onclose = () => console.log('WebSocket Disconnected');

        return () => websocket.close();
    }, []);

    const vectorizeDocuments = () => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ action: "vectorize", openaiKey }));
            alert('Vectorizing documents...')
        } else {
            console.log('WebSocket is not open. Current state:', ws ? ws.readyState : 'WebSocket not initialized');
        }
    };

    const handleQuery = () => {
        if (ws) {
            ws.send(JSON.stringify({ action: "handle_query", query }));
        }
    };
    const handleFileChange = (event) => {
        setFiles(event.target.files); // 将选择的文件存储在状态中
    };
    const uploadFiles = async () => {
        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append('files', file);
        });

        formData.append('openaiKey', openaiKey);

        try {
            const response = await axios.post('http://127.0.0.1:8000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Upload response:', response.data);
            setMessages(prev => [...prev, 'Upload response: ' + response.data.message]); // Assuming 'message' is part of the JSON response
            alert('Files uploaded and processing');
        } catch (error) {
            console.error('Failed to upload files:', error);
            const errorMessage = error.response ? error.response.data.message : 'Failed to upload files without a server response';
            setMessages(prev => [...prev, errorMessage]);
            alert(errorMessage);
        }
    };

    return (
        <>
            <ScrollTransparentNavbar />
            <div className="section section-contact-us text-center" style={{ height: "100vh" }}>
                <Container>
                    <Row>
                        <Col className="text-center ml-auto mr-auto" lg="6" md="8">
                            <Card className="card-contact card-raised">
                                <Form>
                                    <CardBody>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <img src={svg1} alt="OpenAI Logo" width="17" height="17" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="Enter OpenAI API Key"
                                                type="text"
                                                value={openaiKey}
                                                onChange={e => setOpenAIKey(e.target.value)}
                                            />
                                        </InputGroup>
                                        <Input
                                            type="file"
                                            multiple
                                            onChange={handleFileChange}
                                            style={{ marginBottom: "20px" }}
                                        />
                                        <Input
                                            placeholder="Enter your query"
                                            type="textarea"
                                            value={query}
                                            onChange={e => setQuery(e.target.value)}
                                            style={{ height: "100px", marginTop: "20px" }}
                                        />
                                        <Button className="btn-round" color="info" size="lg" onClick={uploadFiles}>
                                            Upload Documents
                                        </Button>
                                        <Button className="btn-round" color="info" size="lg" onClick={vectorizeDocuments}>
                                            Vectorize Documents
                                        </Button>

                                        <Button className="btn-round" color="info" size="lg" onClick={handleQuery} style={{ marginLeft: "10px" }}>
                                            Handle Query
                                        </Button>

                                    </CardBody>
                                </Form>
                            </Card>


                        </Col>
                    </Row>
                </Container>
                <div className="text-center">
                    <Container>
                        <MessageDisplay messages={messages} />
                    </Container>
                </div>
                <FooterBlack />
            </div>
        </>
    );
}

export default ContactUs;

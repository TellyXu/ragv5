import React, { useState, useEffect, useRef } from "react";
import {
    Button, Card, CardBody, Container, Row, Col,
    FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup,
    Label
} from "reactstrap";
import ScrollTransparentNavbar from "../components/Navbars/ScrollTransparentNavbar";
import WhiteNavbar from "../components/Navbars/WhiteNavbar";
import FooterBlack from "../components/Footers/FooterBlack";
import svg1 from '../assets/svg/openai.svg';
import axios from 'axios';
import MessageDisplay from "../components/Log_pseudo_terminal/log3";

import { Input as Ip, Tabs, Button as Btn, Input as in2, Tag, message as Mg, Modal, Divider } from "antd"
import { DeleteOutlined, LineChartOutlined, OpenAIOutlined, UploadOutlined ,FilePdfOutlined , ExclamationOutlined, SnippetsOutlined, SearchOutlined, ReloadOutlined, ExclamationCircleFilled, SettingOutlined, CheckOutlined, } from '@ant-design/icons';
import "./base.scss"
const { TextArea } = in2;
function ContactUs() {
    const [openaiKey, setOpenAIKey] = useState('sk-proj-9OwYFagHZTP6OWLwr2qWT3BlbkFJsAcLEh1cf6Dgt5hEPvjx');
    const [query, setQuery] = useState('');
    const [step, setStep] = useState(0);
    const [messages, setMessages] = useState([{ text: '> Please follow the process on the left to execute the program first...', level: 'info', timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }) }]);
    const [ws, setWs] = useState(null);
    const [files, setFiles] = useState([]);


    useEffect(() => {
        document.title = 'RAG - OPENAI | CDHAI';
        const websocket = new WebSocket('ws://127.0.0.1:8000/ws');
        setWs(websocket);
        // let timer = ''
        websocket.onopen = () => {
            console.log('WebSocket Connected')
        };
        websocket.onmessage = (event) => {
            const timestamp = new Date().toLocaleTimeString(); // Capture current time
            console.log('Message from WebSocket:', event.data);
            setMessages(prev => [...prev, { text: event.data, level: 'info', timestamp: timestamp }]);
        };
        websocket.onerror = (error) => {
            const timestamp = new Date().toLocaleTimeString(); // Capture current time
            console.log('WebSocket Error:', error);
            setMessages(prev => [...prev, { text: 'WebSocket Error', level: 'error', timestamp: timestamp }]);
        };
        websocket.onclose = () => {
            console.log('WebSocket Disconnected')
        };

        return () => websocket.close();
    }, []);


    const vectorizeDocuments = () => {

        if (ws && ws.readyState === WebSocket.OPEN) {
            setStep(-1)
            ws.send(JSON.stringify({ action: "vectorize", openaiKey }));
            Mg.success('Vectorizing documents...')
            setStep(2)
        } else {
            console.log('WebSocket is not open. Current state:', ws ? ws.readyState : 'WebSocket not initialized');
        }
    };

    const deleteLocal = () => {
        setStep(-1)
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ action: "delete_local" }));
            console.log('Local vector store deletion requested.');
        } else {
            console.log('WebSocket is not open. Current state:', ws ? ws.readyState : 'WebSocket not initialized');
        }
        setStep(0);
    };

    const handleQuery = () => {
        if (ws) {
            if (query.trim().length === 0) {
                Mg.warning('Null query content...');
                return
            }
            ws.send(JSON.stringify({ action: "handle_query", query }));
            // setStep(3)
        }
    };
    const handleFileChange = (event) => {
        // setFiles(event.target.files); // 将选择的文件存储在状态中
        uploadFiles(event.target.files)
    };
    const uploadFiles = async (files) => {
        console.log('???', files)
        const formData = new FormData();
        Array.from(files).forEach(file => {

            formData.append('files', file);
        });

        formData.append('openaiKey', openaiKey);

        try {
            setStep(-1)
            const response = await axios.post('http://127.0.0.1:8000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const timestamp = new Date().toLocaleTimeString();
            console.log('Upload response:', response.data);
            setMessages(prev => [...prev, { text: 'Upload response: ' + response.data.message, level: 'info', timestamp: timestamp }]);
            Mg.success('Files uploaded and processing');
            setStep(1)
        } catch (error) {
            const timestamp = new Date().toLocaleTimeString();
            console.error('Failed to upload files:', error);
            const errorMessage = error.response ? error.response.data.message : 'Failed to upload files without a server response';
            setMessages(prev => [...prev, { text: errorMessage, level: 'error', timestamp: timestamp }]);
            Mg.error(errorMessage);
        }
    };

    const inputRef = useRef(null)
    const inputRef2 = useRef(null)

    const [currentUploadMode, setCurrentUploadMode] = useState('files')
    const onChange = (key) => setCurrentUploadMode(key === '1' ? 'files' : 'folder')
    const items = [
        {
            key: '1',
            label: 'Upload files',
            children: <div>
                <input
                    ref={inputRef}
                    type="file"
                    id="fileInput"
                    name="file"
                    multiple
                    style={{
                        position: 'absolute',
                        opacity: 0,
                        left: '-1000px'
                    }}
                    onChange={handleFileChange}
                />
            </div>,
        },
        {
            key: '2',
            label: 'Upload folder',
            children: <div>
                <input
                    ref={inputRef2}
                    type="file"
                    id="fileInput2"
                    name="file"
                    webkitdirectory={currentUploadMode === 'Upload files' ? '' : 'uploadFolder'}
                    mozdirectory={currentUploadMode === 'Upload files' ? '' : 'uploadFolder'}
                    odirectory={currentUploadMode === 'Upload files' ? '' : 'uploadFolder'}
                    style={{
                        position: 'absolute',
                        opacity: 0,
                        left: '-1000px'
                    }}
                    onChange={handleFileChange}
                />
            </div>,
        },
    ];


    return (
        <>
            <WhiteNavbar />
            <div className="section section-contact-us text-center" style={{ paddingBottom: '30px' }}>
                <Row style={{ padding: '0 20px', marginTop: '50px' }}>
                    <Col className="text-left" lg="4" md="8">
                        <Card className="card-contact card-raised">
                            <Form>
                                <CardBody>
                                    <div>
                                        <div>
                                            <Tag color={step > 0 ? 'success' : 'default'} >Step 1 Upload file(s)/folder {step > 0 ? <CheckOutlined /> : <UploadOutlined />}</Tag>
                                        </div>

                                        <div style={{ paddingLeft: '10px' }}>
                                            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                                            <Btn style={{ marginTop: '5px', width: '100%' }}
                                                type="primary" icon={<FilePdfOutlined />} size={'large'} disabled={step !== 0}
                                                onClick={_ => currentUploadMode === 'files' ? inputRef.current.click() : inputRef2.current.click()}>
                                                Specify ({currentUploadMode})
                                            </Btn>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '20px' }}>
                                        <div>
                                            <Tag color={step > 1 ? 'success' : 'default'}>Step 2 Vectorization {step > 1 ? <CheckOutlined /> : <SnippetsOutlined />} </Tag>
                                        </div>

                                        <div style={{ paddingLeft: '10px' }}>
                                            <Btn style={{ marginTop: '10px', width: '100%' }} disabled={step !== 1}
                                                type="primary" icon={<LineChartOutlined />} size={'large'} onClick={vectorizeDocuments}>
                                                Vectorize Documents
                                            </Btn>
                                        </div>
                                    </div>

                                    <Divider dashed />

                                    <div style={{ marginTop: '20px' }}>
                                        <div>
                                            <Tag color={ws ? 'success' : 'error'}>Handler query {<SearchOutlined />}</Tag>
                                        </div>

                                        <div style={{ paddingLeft: '10px' }}>
                                            <TextArea
                                                style={{ marginTop: '10px' }}
                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                                placeholder="Enter your query"
                                                autoSize={{ minRows: 3, maxRows: 5 }}

                                            />
                                            <div style={{ marginTop: '20px', display: 'flex' }}>
                                                <div style={{ width: '100%' }}>
                                                    <Btn style={{ width: '100%' }}
                                                        type="primary" icon={<SearchOutlined />} size={'large'} onClick={handleQuery} disabled={step === -1}>
                                                        Generate Answer
                                                    </Btn>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Divider dashed />

                                    <div style={{ marginTop: '0px' }}>
                                        <div>
                                            <Tag color={'processing'}>Other operation <SettingOutlined /> </Tag>
                                        </div>

                                        <div style={{ paddingLeft: '10px' }}>
                                            <div style={{ marginTop: '10px', display: 'flex' }}>
                                                <div style={{ width: '100%' }} >
                                                    <Btn style={{ width: '100%' }}
                                                        type="primary" icon={<ReloadOutlined />} size={'large'} onClick={_ => {
                                                            Modal.confirm({
                                                                title: 'Caution',
                                                                icon: <DeleteOutlined />,
                                                                content: 'Confirm to delete local Vectorstore',
                                                                onOk() {
                                                                    // window.location.reload();
                                                                    deleteLocal();
                                                                    setStep(0)
                                                                },
                                                                onCancel() {

                                                                },
                                                            })
                                                        }} disabled={step === -1}>
                                                        Delete local Vectorstore
                                                    </Btn>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Form>
                        </Card>



                    </Col>

                    <Col>
                        <div className="text-center" >
                            <MessageDisplay messages={messages} style={{ borderRadius: '10px', overflow: 'hidden' }} />
                        </div>
                    </Col>
                </Row>



            </div >
            <div className={'container-footer'} style={{  width: '100%', }}>
                <FooterBlack />
            </div>
        </>
    );
}

export default ContactUs;

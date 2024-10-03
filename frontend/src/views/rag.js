import React, { useState, useEffect, useRef } from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Label,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col
} from "reactstrap";
import ScrollTransparentNavbar from "../components/Navbars/ScrollTransparentNavbar";
import FooterBlack from "../components/Footers/FooterBlack";



import svg1 from '../assets/svg/openai.svg';
import svg2 from '../assets/svg/fmp-brain-original.svg';
import svg3 from '../assets/svg/company.svg';
import svg4 from '../assets/svg/document.svg';
import svg5 from '../assets/svg/date-year.svg';

import { Input as in2, Divider, Tabs } from 'antd';

import { CheckOutlined } from '@ant-design/icons';
const { TextArea } = in2;

function ContactUs() {


    const [openaikeyFocus, setopenaikeyFocus] = React.useState(false);
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [openaiKey, setOpenAIKey] = useState('sk-proj-9OwYFagHZTP6OWLwr2qWT3BlbkFJsAcLEh1cf6Dgt5hEPvjx');
    const [query, setQuery] = useState('');
    const [apiResponse, setApiResponse] = useState('');
    const [error, setError] = useState('');
    const [realTimeMessages, setRealTimeMessages] = useState([]);
    const [disableInputs, setDisableInputs] = useState(false);  // 新状态：控制输入组件的禁用状态
    const [progressWidth, setProgressWidth] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        document.title = ' RAG - OPENAI | CDHAI';
        const ws = new WebSocket('ws://localhost:8000/ws'); // Ensure this is the correct URL for your WebSocket connection
        ws.onopen = () => console.log('WebSocket Connected');
        ws.onmessage = (event) => {
            console.log('Message from WebSocket:', event.data);
            setRealTimeMessages((prevMessages) => [...prevMessages, event.data]);
        };
        ws.onerror = (error) => console.log('WebSocket Error:', error);
        ws.onclose = () => console.log('WebSocket Disconnected');

        return () => {
            ws.close();
        };
    }, []);

    const handleCheckboxChange = () => {
        const newChecked = !checkboxChecked;
        setCheckboxChecked(newChecked);
        if (newChecked) {
            setOpenAIKey('sk-proj-9OwYFagHZTP6OWLwr2qWT3BlbkFJsAcLEh1cf6Dgt5hEPvjx');
            // setFmpKey('KlrimT7FwkkBiLxYyQ9rvjV0bvY8Tj4w');

            setQuery('Who are the key leadership at Apple? Use the context to answer this question.');
        } else {
            setOpenAIKey('');
            // setFmpKey('');

            setQuery('');
        }
    };



    const handleSubmit = async (event) => {
        setError('');
        setApiResponse('');
        event.preventDefault();

        setProgressWidth(0); // 重置进度条宽度

        const duration = 4500; // 持续时间，例如5秒
        const stepTime = 50; // 更新间隔时间
        let elapsed = 0; // 已过时间

        const timer = setInterval(() => {
            elapsed += stepTime;
            if (elapsed >= duration) {
                clearInterval(timer);
                setProgressWidth(90); // 在最后更新进度条到90%
            } else {
                setProgressWidth(20 + ((elapsed / duration) * 50)); // 从20%增加到90%
            }
        }, stepTime);

        const formData = new FormData();
        const getId = currentUploadMode === 'upload files' ? 'fileInput' : 'fileInput2'
        const fileInput = document.getElementById(getId);
        if (fileInput && fileInput.files.length > 0) {
            formData.append('file', fileInput.files[0]);
        }

        formData.append('openai_key', openaiKey);
        // formData.append('fmp_key', fmpKey);
        formData.append('query', query);

        try {
            const response = await fetch('http://localhost:8000/process-filings/', {
                method: 'POST',
                body: formData,  // 使用 FormData 作为请求体
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setApiResponse(data.message); // 更新状态以显示响应消息
            setError('')
            setProgressWidth(100); // 收到响应后直接设置进度条到100%
        } catch (e) {
            setApiResponse(''); // Update API response message
            setError(`There was a problem with your fetch operation: ${e.message}`);
            setProgressWidth(100); // 收到响应后直接设置进度条到100%
        }

    };

    const toggleInputsDisabled = () => {
        // 获取文件输入元素并检查是否已选择文件
        const getId = currentUploadMode === 'upload files' ? 'fileInput' : 'fileInput2'
        const fileInput = document.getElementById(getId);
        const fileIsEmpty = !fileInput || fileInput.files.length === 0;
        console.log('fileInput.files', fileInput.files)
        // 检查OpenAI API Key是否为空
        // if (!openaiKey.trim()) {
        //     setErrorMessage('Please check your OpenAI API Key');
        //     return; // 如果检查未通过，则不继续执行
        // }

        if (fileIsEmpty) {
            setErrorMessage('Please make sure a file is selected.');
            return; // 如果检查未通过，则不继续执行
        }

        // 如果检查通过，清除错误消息并切换输入禁用状态
        setErrorMessage('');

        setDisableInputs(!disableInputs);

        // 在这里设置进度条的初始进度
        if (!disableInputs) setProgressWidth(20); // 设置进度条到20%
        else setProgressWidth(0); // 重置进度条到0%
    };



    const inputRef = useRef(null)
    const inputRef2 = useRef(null)

    const [currentUploadMode, setCurrentUploadMode] = useState('Upload files')
    const onChange = (key) => setCurrentUploadMode(key === '1' ? 'Upload files' : 'Upload folder')
    const items = [
        {
            key: '1',
            label: 'Upload files',
            children: <input
                ref={inputRef}
                type="file"
                id="fileInput"
                name="file"
                disabled={disableInputs}
                style={{
                    position: 'absolute',
                    opacity: 0,
                    left: '-1000px'
                }}
            />,
        },
        {
            key: '2',
            label: 'Upload folder',
            children: <input
                ref={inputRef2}
                type="file"
                id="fileInput2"
                name="file"
                disabled={disableInputs}
                webkitdirectory={currentUploadMode === 'Upload files' ? '' : 'uploadFolder'}
                mozdirectory={currentUploadMode === 'Upload files' ? '' : 'uploadFolder'}
                odirectory={currentUploadMode === 'Upload files' ? '' : 'uploadFolder'}
                style={{
                    position: 'absolute',
                    opacity: 0,
                    left: '-1000px'
                }}
            />,
        },
    ];


    return (
        <>
            <ScrollTransparentNavbar />

            <div style={{
                display: 'flex', // 使用flex布局
                flexDirection: 'column', // 子元素垂直排列
                justifyContent: 'center', // 垂直居中

                height: '100vh', // 减去页脚的高度

            }}>
                <div
                    className="contactus-1 section-image"
                    style={{
                        backgroundImage: "url(" + require("assets/img/harboreast.png") + ")",
                        backgroundSize: 'cover', // 确保背景图片覆盖整个容器
                        backgroundRepeat: 'no-repeat', // 背景图片不重复
                        backgroundPosition: 'center center', // 背景图片居中显示
                        width: '100%', // 宽度设置为100%
                        height: 'calc(100vh)', // 减去页脚的高度
                    }}
                >
                    <Container style={{ marginTop: '50px' }}>
                        <Row>

                            <Col className="ml-auto mr-auto" md="5">
                                <Card className="card-contact card-raised">
                                    <Form id="contact-form1" method="post" role="form" onSubmit={handleSubmit}>
                                        {/*                                        <CardHeader className="text-center">
                                            <CardTitle tag="h4">Contact Us</CardTitle>
                                        </CardHeader>*/}
                                        <CardBody>

                                            {errorMessage && <div style={{
                                                color: 'red',
                                                textAlign: 'center',
                                                marginBottom: '10px'
                                            }}>{errorMessage}</div>}
                                            <Row>

                                                <Col className="pr-2" md="12">
                                                    <h4 style={{ marginRight: 0, marginTop: 0, marginBottom: 0 }}>
                                                        <CheckOutlined style={{ marginRight: '3px' }} />
                                                        STEP 1 <span style={{ fontSize: '12px' }}> (Upload)</span>
                                                        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                                                    </h4>
                                                    <label>OpenAI API Key</label>
                                                    {/* <InputGroup
                                                        className={openaikeyFocus ? "input-group-focus" : ""}
                                                        disabled={disableInputs}  // 控制禁用状态
                                                    >
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <img src={svg1} alt="OpenAI Logo" width="17"
                                                                    height="17" />
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            value={openaiKey}
                                                            onChange={(e) => setOpenAIKey(e.target.value)}
                                                            aria-label="OpenAI API Key"
                                                            autoComplete="off"
                                                            placeholder="OpenAI API Key"
                                                            type="text"
                                                            onFocus={() => setopenaikeyFocus(true)}
                                                            onBlur={() => setopenaikeyFocus(false)}
                                                            disabled={disableInputs}  // 控制禁用状态
                                                        />
                                                    </InputGroup> */}
                                                </Col>
                                            </Row>
                                            <Row>


                                            </Row>
                                            <div style={{ display: 'flex' }}>
                                                <Button
                                                    color="info"
                                                    onClick={_ => currentUploadMode === 'Upload files' ? inputRef.current.click() : inputRef2.current.click()}
                                                    style={{ display: 'block', margin: '10px auto', width: '150px' }}
                                                >
                                                    {currentUploadMode}...
                                                </Button>
                                                <Button
                                                    color="info"
                                                    onClick={toggleInputsDisabled}
                                                    style={{ display: 'block', margin: '10px auto' }}
                                                >
                                                    {!disableInputs ? 'Submit Key & File' : 'Re Enter Key & File'}
                                                </Button>
                                            </div>
                                            <h4 style={{ marginRight: 0, marginTop: '10px', marginBottom: 0 }}>
                                                <CheckOutlined style={{ marginRight: '3px' }} />
                                                STEP 2 <span style={{ fontSize: '12px' }}> (Query)</span>
                                            </h4>
                                            <FormGroup>
                                                {/* <Input
                                                    value={query}
                                                    onChange={(e) => setQuery(e.target.value)}
                                                    id="message"
                                                    name="message"
                                                    disabled={!disableInputs}
                                                    rows="6"
                                                    type="textarea"
                                                ></Input> */}

                                                <TextArea
                                                    value={query}
                                                    onChange={(e) => setQuery(e.target.value)}
                                                    placeholder="Controlled autosize"
                                                    autoSize={{
                                                        minRows: 3,
                                                        maxRows: 5,
                                                    }}
                                                    disabled={!disableInputs}
                                                />

                                            </FormGroup>

                                            <Row>
                                                <Col md="6">
                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input type="checkbox"
                                                                checked={checkboxChecked}
                                                                disabled={disableInputs}
                                                                onChange={handleCheckboxChange} />
                                                            <span className="form-check-sign"></span>
                                                            {checkboxChecked ? 'Clear' : 'Default'}
                                                        </Label>
                                                    </FormGroup>
                                                </Col>

                                                <Col md="6">
                                                    <Button
                                                        className="btn-round pull-right"
                                                        color={disableInputs ? "info" : "gray"}
                                                        type="submit"
                                                        disabled={!disableInputs}
                                                    >
                                                        Submit Query
                                                    </Button>

                                                </Col>
                                            </Row>

                                            <Divider dashed />

                                        </CardBody>
                                    </Form>
                                </Card>
                            </Col>

                            {apiResponse && <Col md="5">
                                <Card className="card-contact card-raised" style={{ padding: '0 20px' }}>
                                    <h2 className="title" style={{ color: 'black' }}>Message From GPT</h2>
                                    <h2 className="title">
                                        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                                    </h2>
                                    <div style={{ color: "rgba(255, 255, 255,1)" }}>
                                        {apiResponse && <pre style={{
                                            color: "rgba(255, 255, 255,1)",
                                            whiteSpace: "pre-wrap"
                                        }}>{apiResponse}</pre>}
                                    </div>
                                </Card>
                            </Col>}
                        </Row>
                    </Container>

                </div>
                <FooterBlack style={{
                    width: '100%', // 宽度设置为100%
                    boxSizing: 'border-box',
                    margin: '0', // Resets any margin that might be present
                    padding: '0', // Resets any padding that might be present
                }} />
            </div>



        </>
    );
}

export default ContactUs;

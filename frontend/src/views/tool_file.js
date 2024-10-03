import React, { useState, useEffect } from "react";

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



const MapWrapper = () => {
    const mapRef = React.useRef(null);
    React.useEffect(() => {
        let google = window.google;
        let map = mapRef.current;
        let lat = "40.748817";
        let lng = "-73.985428";
        const myLatlng = new google.maps.LatLng(lat, lng);
        const mapOptions = {
            zoom: 13,
            center: myLatlng,
            scrollwheel: false,
            zoomControl: true,
            styles: [
                {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
                },
                {
                    featureType: "landscape",
                    elementType: "geometry",
                    stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#ffffff" }, { lightness: 17 }]
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }]
                },
                {
                    featureType: "road.arterial",
                    elementType: "geometry",
                    stylers: [{ color: "#ffffff" }, { lightness: 18 }]
                },
                {
                    featureType: "road.local",
                    elementType: "geometry",
                    stylers: [{ color: "#ffffff" }, { lightness: 16 }]
                },
                {
                    featureType: "poi",
                    elementType: "geometry",
                    stylers: [{ color: "#f5f5f5" }, { lightness: 21 }]
                },
                {
                    featureType: "poi.park",
                    elementType: "geometry",
                    stylers: [{ color: "#dedede" }, { lightness: 21 }]
                },
                {
                    elementType: "labels.text.stroke",
                    stylers: [
                        { visibility: "on" },
                        { color: "#ffffff" },
                        { lightness: 16 }
                    ]
                },
                {
                    elementType: "labels.text.fill",
                    stylers: [{ saturation: 36 }, { color: "#333333" }, { lightness: 40 }]
                },
                { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
                {
                    featureType: "transit",
                    elementType: "geometry",
                    stylers: [{ color: "#f2f2f2" }, { lightness: 19 }]
                },
                {
                    featureType: "administrative",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#fefefe" }, { lightness: 20 }]
                },
                {
                    featureType: "administrative",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }]
                }
            ]
        };

        map = new google.maps.Map(map, mapOptions);

        const marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            animation: google.maps.Animation.DROP,
            title: "Now UI Kit PRO React!"
        });

        const contentString =
            '<div class="info-window-content"><h2>Now UI Kit PRO React</h2>' +
            "<p>A premium Admin for React, Reactstrap, and React Hooks.</p></div>";

        const infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        google.maps.event.addListener(marker, "click", function () {
            infowindow.open(map, marker);
        });
    });
    return (
        <>
            <div style={{ height: `100%` }} ref={mapRef}></div>
        </>
    );
};



function ContactUs() {


    const [openaikeyFocus, setopenaikeyFocus] = React.useState(false);
    // const [fmpkeyFocus, setfmpkeyFocus] = React.useState(false);

    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [openaiKey, setOpenAIKey] = useState('');
    // const [fmpKey, setFmpKey] = useState('');

    const [query, setQuery] = useState('');
    const [apiResponse, setApiResponse] = useState('');
    const [error, setError] = useState('');
    const [realTimeMessages, setRealTimeMessages] = useState([]);


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
            // setO    ben   AIKey('XXX');
            // setFmpKey('XXX');

            setQuery('Who are the key leadership at Apple? Use the context to answer this question.');
        } else {
            setOpenAIKey('');
            // setFmpKey('');

            setQuery('');
        }
    };


    const handleSubmit = async (event) => {


        event.preventDefault();

        const formData = new FormData();
        const fileInput = document.getElementById('fileInput');
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
        } catch (e) {
            setError(`There was a problem with your fetch operation: ${e.message}`);
        }
    };





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
                        backgroundImage: "url(" + require("assets/img/HBC_JHU5704_c_3000x2000.jpg") + ")",
                        backgroundSize: 'cover', // 确保背景图片覆盖整个容器
                        backgroundRepeat: 'no-repeat', // 背景图片不重复
                        backgroundPosition: 'center center', // 背景图片居中显示
                        width: '100%', // 宽度设置为100%
                        height: 'calc(100vh)', // 减去页脚的高度
                    }}
                >
                    <Container>
                        <Row>

                            <Col className="ml-auto mr-auto" md="5">
                                <Card className="card-contact card-raised">
                                    <Form id="contact-form1" method="post" role="form" onSubmit={handleSubmit}>
{/*                                        <CardHeader className="text-center">
                                            <CardTitle tag="h4">Contact Us</CardTitle>
                                        </CardHeader>*/}
                                        <CardBody>
                                            <Row>
                                                <Col className="pr-2" md="12">
                                                    <label>OpenAI API Key</label>
                                                    <InputGroup
                                                        className={openaikeyFocus ? "input-group-focus" : ""}
                                                    >
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <img src={svg1} alt="OpenAI Logo" width="17"
                                                                     height="17"/>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            value={openaiKey}
                                                            onChange={(e) => setOpenAIKey(e.target.value)}
                                                            aria-label="OpenAI API Key"
                                                            autoComplete="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                                                            placeholder="OpenAI API Key"
                                                            type="text"
                                                            onFocus={() => setopenaikeyFocus(true)}
                                                            onBlur={() => setopenaikeyFocus(false)}
                                                        ></Input>
                                                    </InputGroup>
                                                </Col>
                                                {/*<Col className="pl-2" md="6">*/}
                                                {/*    <FormGroup>*/}
                                                {/*        <label>FMP API Key</label>*/}
                                                {/*        <InputGroup*/}
                                                {/*            className={fmpkeyFocus ? "input-group-focus" : ""}*/}
                                                {/*        >*/}
                                                {/*            <InputGroupAddon addonType="prepend">*/}
                                                {/*                <InputGroupText>*/}
                                                {/*                    <img src={svg2} alt="FMP Brain" width="17"*/}
                                                {/*                         height="17"/>*/}
                                                {/*                </InputGroupText>*/}
                                                {/*            </InputGroupAddon>*/}
                                                {/*            <Input*/}
                                                {/*                value={fmpKey}*/}
                                                {/*                onChange={(e) => setFmpKey(e.target.value)}*/}
                                                {/*                aria-label="FMP API Key"*/}
                                                {/*                autoComplete='KlrimT7FwkkBiLxYyQ9rvjV0bvY8Tj4w'*/}
                                                {/*                placeholder="FMP API Key"*/}
                                                {/*                type="text"*/}
                                                {/*                onFocus={() => setfmpkeyFocus(true)}*/}
                                                {/*                onBlur={() => setfmpkeyFocus(false)}*/}
                                                {/*            ></Input>*/}
                                                {/*        </InputGroup>*/}
                                                {/*    </FormGroup>*/}
                                                {/*</Col>*/}
                                            </Row>


                                            <Row>
                                                <div className="text-center">
                                                    <input type="file" id="fileInput" name="file"
                                                           style={{display: 'block', margin: '0 auto'}}/>
                                                </div>
                                            </Row>

                                            <FormGroup>
                                                <label>Query</label>
                                                <Input
                                                    value={query}
                                                    onChange={(e) => setQuery(e.target.value)}
                                                    id="message"
                                                    name="message"
                                                    rows="6"
                                                    type="textarea"
                                                ></Input>
                                            </FormGroup>

                                            <Row>
                                                <Col md="6">
                                                    <FormGroup check>
                                                        <Label check>
                                                            <Input type="checkbox" checked={checkboxChecked}
                                                                   onChange={handleCheckboxChange}/>
                                                            <span className="form-check-sign"></span>
                                                            {checkboxChecked ? 'Clear' : 'Default'}
                                                        </Label>
                                                    </FormGroup>
                                                </Col>
                                                <Col md="6">
                                                    <Button
                                                        className="btn-round pull-right"
                                                        color="info"
                                                        type="submit"
                                                    >
                                                        Submit
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Form>
                                </Card>
                            </Col>
                            <Col md="5">
                                <h2 className="title">Message From GPT</h2>
                                <h2 className="title">
                                    {error && <p style={{color: 'red'}}>Error: {error}</p>}
                                </h2>
                                <div style={{color: "rgba(255, 255, 255,1)"}}>
                                    {apiResponse && <pre style={{
                                        color: "rgba(255, 255, 255,1)",
                                        whiteSpace: "pre-wrap"
                                    }}>{apiResponse}</pre>}
                                </div>
                            </Col>
                        </Row>
                    </Container>

                </div>
                <FooterBlack style={{
                    width: '100%', // 宽度设置为100%
                    boxSizing: 'border-box',
                    margin: '0', // Resets any margin that might be present
                    padding: '0', // Resets any padding that might be present
                }}/>
            </div>



            </>
            );
            }

export default ContactUs;

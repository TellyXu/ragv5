import React from 'react';
import { Button, Container } from 'reactstrap';
import colab_background from 'assets/img/presentation-page/colab_background.png';

function FreeDemo() {
    return (
        <div
            className="section section-free-demo"
            style={{
                position: 'relative',

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
            }}
        >
            <Container style={{ display: 'flex', alignItems: 'center' }}>
                <div
                    className="section-description"
                    style={{
                        maxWidth: '70%',
                        zIndex: 2
                    }}
                >
                    <h2 className="title">Colab Source Code</h2>
                    <h5 className="description">
                        Do you want to see the source code of the RAG_OEPNAI after trying the interval?
                        You can give the colab a try, and get better understanding of today's lesson.
                    </h5>
                    <Button
                        className="btn-round"
                        color="info"
                        href="https://colab.research.google.com/drive/1oZWq9PzQ62n_FmLwkwkrVGFtD8rsh8cF?usp=sharing#scrollTo=6uBD2SsVXhcv"
                        target="_blank"
                    >
                        View code on Google Colab
                    </Button>
                </div>
                <img
                    src={colab_background}
                    alt="Colab Background"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '75%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1,
                        opacity: 0.3
                    }}
                />
            </Container>
        </div>
    );
}

export default FreeDemo;

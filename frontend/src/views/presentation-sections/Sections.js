import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

// core components

function Sections() {
  return (
    <>
      <div className="section section-sections" data-background-color="gray">
        <Container>
          <Col className="ml-auto mr-auto" md="8" >
          <div className="section-description text-center">
              <h2 className="title">Lets start</h2>
              <h5 className="description">
                Before entering this amazing interval, we need OPENAI API keys. Try to generate yours. <br />
                OPEN AI LLM api key: <a href="https://platform.openai.com/">https://platform.openai.com/</a>
              </h5>
              <Button
                className="btn-round"
                to="/rag"
                color="info"
                tag={Link}
              >
                Enter the interval
              </Button>
            </div>
          </Col>
        </Container>

      </div>
    </>
  );
}

export default Sections;

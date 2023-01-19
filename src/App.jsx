import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./assets/css/app.css"
import buttonimg from "./assets/images/button.png"
import {useNavigate} from "react-router-dom"

function App() {
  const navigate = useNavigate();
  const handleGoTo = (e) =>{
    e.preventDefault();
    navigate("/landing")
  }

  return (
    <React.Fragment>
      <Container fluid className=" p-2 cursor-pointer">
        <Row className="d-flex flex-row justify-content-center align-center">
          <Col md={7} className="overflow-hidden">
            <h1 className="text">QASTNIM</h1>
            <h1 className="text">TASK</h1>
            <h1 className="text">WEB</h1>
            <h1 className="text-dev">DEVELOPMENT</h1>
          </Col>
          <Col md={5} className="left-box">
            <div className="center-box">
              <img src={buttonimg} alt="button" onClick={handleGoTo} />
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default App;

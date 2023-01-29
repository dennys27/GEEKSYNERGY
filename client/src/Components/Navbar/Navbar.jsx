import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Navbars = () => {
  
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  }

  let user = JSON.parse(localStorage.getItem("user"));

  return (
    <Navbar bg="dark" className="text-white" expand="lg">
      <Container>
        <Navbar.Brand className="text-white" href="#home">
          Authentication system
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="text-white" href="#home">
              Home
            </Nav.Link>
            <Nav.Link className="text-white" href="#link">
              {`welcome ${user.name}`}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Button onClick={() => logOut()}>Logout</Button>
      </Container>
    </Navbar>
  );
};

export default Navbars;

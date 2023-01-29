import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
 
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profession, setProfession] = useState("");
  const [password, setPassword] = useState("");
  const notify = (string) => toast(string);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/user/signup", {
        name,
        email,
        phone,
        profession,
        password,
      })
      .then((data) => {
        console.log(data.data, "incoming");
        notify("success");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        notify(err.response.data.message);
      });
  };

  return (
    <div className="pt-5">
      <Container>
        <h3>Sign Up</h3>
        <Form classname="w-50%">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter Name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="Phone"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Proffession</Form.Label>
            <Form.Control
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              type="text"
              placeholder="Proffession"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <p className="text-primary" onClick={() => navigate("/login")}>
            Log in
          </p>

          <Button onClick={(e) => onSubmit(e)} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Signup;

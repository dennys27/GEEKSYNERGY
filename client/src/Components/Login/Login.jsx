import React from "react";
import Container from "react-bootstrap/Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const notify = (string) => toast(string);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/user/login", {
        email,
        password,
      })
      .then((data) => {
        if (data.data.status) {
          console.log(data.data, "incoming");
          notify("success");
          localStorage.setItem("user", JSON.stringify(data.data));
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          notify("invlid credentials");
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        notify(err.response.data.message);
      });
  };

  return (
    <div className="pt-5">
      <Container>
        <h3>Login</h3>
        <Form className="w-50%">
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
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <p className="text-primary" onClick={()=>navigate("/signup")}>Sign up</p>

          <Button onClick={(e) => onSubmit(e)} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Login;

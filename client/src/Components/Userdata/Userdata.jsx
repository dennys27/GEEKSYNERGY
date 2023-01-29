import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";

const Userdata = () => {
  const [change, setChange] = useState("");
  const [users, setUsers] = useState([]);
  const notify = (string) => toast(string);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8000/admin/users", {
        headers: {
          token: `Bearer ${JSON.parse(localStorage.getItem("admin"))?.token}`,
        },
      })
      .then(async (data) => {
        setUsers(data?.data);
      })
      .catch((err) => {
        console.log(err.response);
        localStorage.removeItem("admin");
        navigate("/adminlogin");
      });
  }, [change]);

  const deleteUser = async (id) => {
    await axios
      .post(
        "http://localhost:8000/admin/delete",
        { _id: id },
        {
          headers: {
            token: `Bearer ${JSON.parse(localStorage.getItem("admin"))?.token}`,
          },
        }
      )
      .then((data) => {
        console.log(Math.random());
        notify("deleted");
        setChange(Math.random());
      })
      .catch((err) => {
        localStorage.removeItem("admin");
        navigate("/adminlogin");
      });
  };

  return (
    <Container className="mt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Profession</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.phone}</td>
              <td>{user?.profession}</td>
              <td className="d-flex justify-content-around">
                <Button
                  onClick={() => navigate("/Edit", { state: { user } })}
                  variant="primary"
                >
                  Edit
                </Button>
                <Button onClick={() => deleteUser(user?._id)} variant="danger">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
    </Container>
  );
};

export default Userdata;

import React from 'react';
import Navbars from '../Navbar/Navbar';
import Container from "react-bootstrap/Container";


const Home = () => {
  return (
    <>
      <Navbars />
      <Container className="mt-5">
        <h1 className="mt-5">
        
          Lets Find Something <br /> New
        </h1>
      </Container>
    </>
  );
}

export default Home
import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from '../../Navbar'
import Container from '@mui/material/Container';


const Main = ({ children }) => {

  const styleContainer = {
    padding: 5
  }

  return (
    <main>
      <Navbar />
      <Container sx={styleContainer}>
        <Outlet />
        {children}
      </Container>
    </main>
  );
}


export default Main;
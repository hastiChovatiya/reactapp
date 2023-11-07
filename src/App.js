import React from "react";
import "../src/index.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cart from "./pages/Cart";
import { SnackbarProvider } from "notistack";
import { Slide } from "@mui/material";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  let localSt = JSON.parse(localStorage.getItem('user'))
  // console.log('object');
  return (
    <>
      <Router>
        <SnackbarProvider
          TransitionComponent={Slide}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/cart" element={<Cart />} />
            {
              localSt != null ?
                <>
                  <Route exact path="/login" element={<Navigate to='/' />} />
                  <Route exact path="/register" element={<Navigate to='/' />} />
                </> :
                <>
                  <Route exact path="login" element={<Login />} />
                  <Route exact path="register" element={<Register />} />
                </>
            }


          </Routes>
        </SnackbarProvider>
      </Router>
    </>
  );
};

export default App;

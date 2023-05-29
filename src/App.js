import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Store from "./component/store/Store";
import Home from "./component/home/Home";
import {About} from "./component/about/About";
import './App.css';

function App() {
  return (
    <Router basename="/">
     
        <Navbar bg="dark" variant="dark" fixed="top">
          <Container className="justify-content-center">
            <Nav>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/store" className="nav-link">Store</Link>
              <Link to="/about" className="nav-link">About</Link>
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <footer>
        <div class="footer-title">
            The Generics
        </div>
        <div class="footer-icons">
            <ul>
                <li><a href="https://www.youtube.com">
                    <img src="/img/6260efc8fc9a9002669d2f4ad9956cc0.jpg" alt="" />
                </a></li>
                <li><a href="https://spotify.com">
                    <img src="/img/Spotify Logo.png" alt="" />
                </a></li>
                <li><a href="https://facebook.com">
                    <img src="/img/Facebook Logo.png" alt="" />
                </a></li>
            </ul>
        </div>
    </footer>
      
    </Router>
  );
}

export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Store from "./component/store/Store";
import Home from "./component/home/Home";
import { About } from "./component/about/About";
import "./App.css";
import ContactUs from "./component/contact-us/ContactUs";
import ProductDetail from "./component/ProductDetails/ProductDetail";
function App() {
  async function contactDetailHandler(contact) {
    const response = await fetch(
      "https://ecom-app-74ad3-default-rtdb.firebaseio.com/contact.json",
      {
        method: "POST",
        body: JSON.stringify(contact),
      }
    );
    const data = await response.json(contact);

    console.log(data);
  }

  return (
    <Router basename="/">
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container className="justify-content-center">
          <Nav>
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/store" className="nav-link">
              Store
            </NavLink>
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
            <NavLink to="/contact-us" className="nav-link">
              Contact us
            </NavLink>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/contact-us"
          element={<ContactUs onAdd={contactDetailHandler} />}
        />
        <Route path="/store/:productID" element={<ProductDetail />} />
      </Routes>
      <footer>
        <div className="footer-title">The Generics</div>
        <div className="footer-icons">
          <ul>
            <li>
              <a href="https://www.youtube.com">
                <img src="/img/6260efc8fc9a9002669d2f4ad9956cc0.jpg" alt="" />
              </a>
            </li>
            <li>
              <a href="https://spotify.com">
                <img src="/img/Spotify Logo.png" alt="" />
              </a>
            </li>
            <li>
              <a href="https://facebook.com">
                <img src="/img/Facebook Logo.png" alt="" />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </Router>
  );
}

export default App;

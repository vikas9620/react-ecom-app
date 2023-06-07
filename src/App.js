import React, { useContext, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
  Navigate,
} from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { BiHome } from "react-icons/bi";

import { BsBagFill, BsInfoCircleFill, BsPhone } from "react-icons/bs";
import { RiLoginCircleFill } from "react-icons/ri";

import Login from "./authentication/Login";

import { About } from "./component/about/About";
import "./App.css";
import ContactUs from "./component/contact-us/ContactUs";
import ProductDetail from "./component/ProductDetails/ProductDetail";
import CartContext from "./cartcontext/CartContext";
import Logout from "./authentication/Logout";
const Home = React.lazy(() => import("./component/home/Home.js"));
const Store = React.lazy(() => import("./component/store/Store.js"));
function App() {
  const { isLoggedIn } = useContext(CartContext);

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
            <Nav.Link as={NavLink} to="/" activeclassname="active" >
              <BiHome className="nav-icon" />
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} activeclassname="active" to="/store">
              <BsBagFill className="nav-icon" />
              Store
            </Nav.Link>

            <Nav.Link as={NavLink} activeclassname="active" to="/about">
              <BsInfoCircleFill className="nav-icon" />
              About
            </Nav.Link>
            <Nav.Link as={NavLink} activeclassname="active" to="/contact-us">
              <BsPhone className="nav-icon" />
              Contact
            </Nav.Link>
            {!isLoggedIn && (
              <Nav.Link as={NavLink} activeclassname="active" to="/login">
                <RiLoginCircleFill className="nav-icon" />
                Login
              </Nav.Link>
            )}
            {isLoggedIn && <Logout />}
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          }
          exact
        />
        {isLoggedIn ? (
          <Route
            path="/store"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Store />
              </Suspense>
            }
          />
        ) : (
          <Route path="/store" element={<Navigate replace to="/login" />} />
        )}
        <Route path="/about" element={<About />} />
        <Route
          path="/contact-us"
          element={<ContactUs onAdd={contactDetailHandler} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/store/:productID" element={<ProductDetail />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>

      <footer>
        <div className="footer-title">The Generics</div>
        <div className="footer-icons">
          <ul>
            <li>
              <a href="https://icons8.com/icon/118497/facebook">
              <img src="https://img.icons8.com/material-outlined/24/facebook.png" alt="facebook"/>
              </a>
            </li>
            <li>
            <a  href="https://icons8.com/icon/G9XXzb9XaEKX/spotify"><img width="48" height="48" src="https://img.icons8.com/fluency/48/spotify.png" alt="spotify"/>
              </a>
            </li>
            <li>
              <a href="https://facebook.com">
              <img width="48" height="48" src="https://img.icons8.com/color/48/youtube-play.png" alt="youtube-play"/>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </Router>
  );
}
export default App;

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
            <Nav.Link as={NavLink} to="/" activeClassName="active" exact>
              <BiHome className="nav-icon" />
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} activeClassName="active" to="/store">
              <BsBagFill className="nav-icon" />
              Store
            </Nav.Link>

            <Nav.Link as={NavLink} activeClassName="active" to="/about">
              <BsInfoCircleFill className="nav-icon" />
              About
            </Nav.Link>
            <Nav.Link as={NavLink} activeClassName="active" to="/contact-us">
              <BsPhone className="nav-icon" />
              Contact us
            </Nav.Link>
            {!isLoggedIn && (
              <Nav.Link as={NavLink} activeClassName="active" to="/login">
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

import { useContext } from "react";
import React, { useRef } from "react";
import CartContext from "../cartcontext/CartContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const AuthCtx = useContext(CartContext);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value
    const enteredPassword = passwordRef.current.value
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAjNm-ahOVZKpXVfdtf0qzATJ6R5AnAXH4",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: { "content-type": "application/json" },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Login failed");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        AuthCtx.login(data.idToken, data.email);
        localStorage.setItem("email", data.email);
        navigate("/store");
      })
      .catch((error) => {
        alert(error.Message);
      });
  };

  return (
    <form className="login-form" onSubmit={formSubmitHandler}>
      <div className="card">
        <h1>Login</h1>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          ref={emailRef}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          ref={passwordRef}
        />
        <button type="submit" name="login">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Login;

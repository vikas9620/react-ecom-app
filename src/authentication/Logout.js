import "./Login.css";
import { useContext } from "react";
import React from "react";
import CartContext from "../cartcontext/CartContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
const Logout = () => {
  const { logout } = useContext(CartContext);
  const navigate = useNavigate();
  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  return (
    <button onClick={logoutHandler}>
      <FiLogOut />
      logout
    </button>
  );
};

export default Logout;

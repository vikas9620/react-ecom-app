import React from "react";

const CartContext = React.createContext({
  token: "token",
userEmail: "",
  cartItems: [],
  addItem: (item) => {},
  removeItems: (item) => {},
  login: (user) => {},
  isLoggedIn: "isLoggedIn",
  logout: (user) => {},
  fetchData: (item) => {},
});

export default CartContext;

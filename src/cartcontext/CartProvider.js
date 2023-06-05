import React, { useState } from "react";
import CartContext from "./CartContext";
const CartProvider = (props) => {
  const [items, setItems] = useState([]);
  const initialTokenValue = localStorage.getItem('token');
const [token, setToken] = useState(initialTokenValue)
const userIsLoggedIn=!!token
  const addItemHandler = (item) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((prevItem) => prevItem.title === item.title);

      if (existingItemIndex !== -1) {
        // Item already exists in the cart, show alert
        alert("Item already exists in the cart");
        return prevItems;
      } else {
        // Item is new, add it to the cart with quantity 1
        const newItem = { ...item, quantity: 1, id: item.title};
      return [...prevItems, newItem];
      }
    });
  };

  const removeItemHandler = (itemTitle) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.title!==itemTitle);
      return updatedItems;
    });
  };
const loginHandler=(token)=>{
setToken(token);
localStorage.setItem('token', token);

}
  const cartContext = {

    token: token,
    isLoggedIn: userIsLoggedIn,
    cartItems: items,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    login: loginHandler
  };

  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};
export default CartProvider
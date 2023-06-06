import React, { useState } from "react";
import CartContext from "./CartContext";

const CartProvider = (props) => {
  const initialTokenValue = localStorage.getItem("token");
  const [token, setToken] = useState(initialTokenValue);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userEmail, setUserMail] = useState("");
  const [cartData, setCartData] = useState([]);
  const url = "31aab866416c477da39e803610f0dd13";
  const loginHandler = (token, email) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email); // Set the email in localStorage
    setUserMail(email.replace(/[@.]/g, ""));
    setIsLoggedIn(true);
  };
  const fetchCartItems = async () => {
    try {
      const response = await fetch(
        `https://crudcrud.com/api/${url}/cart${userEmail}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.quantity);
        setCartData(data);
      } else {
        console.error("Failed to retrieve cart items.");
      }
    } catch (error) {
      console.error("Error retrieving cart items:", error);
    }
  };

  const addItemHandler = async (item) => {
    fetchCartItems();
    try {
      const response = await fetch(
        `https://crudcrud.com/api/${url}/cart${userEmail}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );

      if (response.ok) {
        setCartData((prevItems) => {
          console.log(userEmail);
          const existingItemIndex = prevItems.findIndex(
            (prevItem) => prevItem.id === item.id
          );

          if (existingItemIndex !== -1) {
            // Item already exists in the cart, show alert
            alert("Item already exists in the cart");
            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex].quantity += 1;
            console.log(updatedItems[existingItemIndex].quantity);
            return updatedItems;
          } else {
            // Item is new, add it to the cart with quantity 1
            const newItem = { ...item, quantity: 1, id: item.id };
            return [...prevItems, newItem];
          }
        });
        // Fetch the updated cart items after adding the item
      } else {
        console.error("Failed to add item to the cart.");
      }
    } catch (error) {
      console.error("Error adding item to the cart:", error);
    }
  };

  // Function to retrieve the user's cart items from the backend API

  const removeItemHandler = async (id) => {
    try {
      const response = await fetch(
        `https://crudcrud.com/api/${url}/cart${userEmail}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(id),
        }
      );

      if (response.ok) {
        setCartData((prevItems) => {
          const updatedItems = prevItems.filter((item) => item.id !== id);
          return updatedItems;
        });
        fetchCartItems();
      } else {
        console.error("Failed to remove item from cart.");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const logoutHandler = () => {
    setToken(null);
    setUserMail("");
    localStorage.removeItem("token");

    setIsLoggedIn(false);
  };
  const cartContext = {
    userEmail: userEmail,
    token: token,
    isLoggedIn: isLoggedIn,
    cartItems: cartData,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    login: loginHandler,
    logout: logoutHandler,
    fetchData: fetchCartItems,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;

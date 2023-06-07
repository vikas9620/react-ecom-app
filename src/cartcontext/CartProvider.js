import React, { useState } from "react";
import CartContext from "./CartContext";

const CartProvider = (props) => {
  const initialTokenValue = localStorage.getItem("token");
  const [token, setToken] = useState(initialTokenValue);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userEmail, setUserMail] = useState("");
  const [cartData, setCartData] = useState([]);
 
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
        `https://ecom-app-74ad3-default-rtdb.firebaseio.com/cart${userEmail}.json`
      );
  
      if (response.ok) {
        const data = await response.json();
  
        if (data) {
          const cartItems = Object.values(data);
          setCartData(cartItems);
        } else {
          setCartData([]);
        }
      } else {
        console.error("Failed to retrieve cart items.");
      }
    } catch (error) {
      console.error("Error retrieving cart items:", error);
    }
  };
  

  const addItemHandler = async (item) => {
    try {
      const response = await fetch(`https://ecom-app-74ad3-default-rtdb.firebaseio.com/cart${userEmail}.json`);
      if (response.ok) {
        const existingItems = await response.json();
  
        if (existingItems) {
          const existingItemKeys = Object.keys(existingItems);
          const existingItemIndex = existingItemKeys.findIndex((key) => existingItems[key].id === item.id);
  
          if (existingItemIndex > -1) {
            // Item already exists in the cart, update the quantity
            const existingItemKey = existingItemKeys[existingItemIndex];
            const existingItem = existingItems[existingItemKey];
            existingItem.quantity += 1;
  
            await fetch(`https://ecom-app-74ad3-default-rtdb.firebaseio.com/cart${userEmail}/${existingItemKey}.json`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(existingItem),
            });
  
            const updatedItems = existingItemKeys.map((key) => {
              if (key === existingItemKey) {
                return existingItem;
              }
              return existingItems[key];
            });
  
            setCartData(updatedItems);
          } else {
            // Item is new, add it to the cart with quantity 1
            const newItem = { ...item, quantity: 1 };
            await fetch(`https://ecom-app-74ad3-default-rtdb.firebaseio.com/cart${userEmail}.json`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newItem),
            });
  
            const updatedItems = [...existingItemKeys.map((key) => existingItems[key]), newItem];
            setCartData(updatedItems);
          }
        } else {
          // No existing items in the cart, add the item as a new item with quantity 1
          const newItem = { ...item, quantity: 1 };
          await fetch(`https://ecom-app-74ad3-default-rtdb.firebaseio.com/cart${userEmail}.json`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem),
          });
  
          setCartData([newItem]);
        }
      } else {
        console.error("Failed to fetch cart items from the API.");
      }
    } catch (error) {
      console.error("Error adding item to the cart:", error);
    }
  };
  
  
  const removeItemHandler = async (id) => {
    try {
      const response = await fetch(
        `https://ecom-app-74ad3-default-rtdb.firebaseio.com/cart${userEmail}.json`
      );
  
      if (response.ok) {
        const existingItems = await response.json();
  
        // Find the item key based on the provided id
        const itemKey = Object.keys(existingItems).find(
          (key) => existingItems[key].id === id
        );
  
        if (itemKey) {
          // Get the existing item from the cart
          const existingItem = existingItems[itemKey];
  
          if (existingItem.quantity > 1) {
            // Decrease the quantity if greater than 1
            existingItem.quantity -= 1;
  
            // Update the existing item in the cart
            await fetch(
              `https://ecom-app-74ad3-default-rtdb.firebaseio.com/cart${userEmail}/${itemKey}.json`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(existingItem),
              }
            );
  
            // Update the cart items by mapping over them and updating the target item
            setCartData((prevCartItems) =>
              prevCartItems.map((item) => {
                if (item.id === id) {
                  return existingItem;
                }
                return item;
              })
            );
          } else {
            // Remove the item from the cart if quantity becomes zero
            await fetch(
              `https://ecom-app-74ad3-default-rtdb.firebaseio.com/cart${userEmail}/${itemKey}.json`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
  
            // Update the cart items by filtering out the removed item
            setCartData((prevCartItems) =>
              prevCartItems.filter((item) => item.id !== id)
            );
          }
        } else {
          console.error("Item not found in the cart.");
        }
      } else {
        console.error("Failed to fetch cart items from the API.");
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

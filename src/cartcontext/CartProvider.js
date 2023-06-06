import React, { useState } from "react";
import CartContext from "./CartContext";

const CartProvider = (props) => {
  const loginHandler = (token, email) => {
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('email', email); // Set the email in localStorage
    setUserMail(email.replace(/[@.]/g, ''));
    setIsLoggedIn(true);
  };
  const initialTokenValue = localStorage.getItem('token');
const [token, setToken] = useState(initialTokenValue)
const [isLoggedIn, setIsLoggedIn] = useState(false)

const [userEmail, setUserMail] = useState('')
const [cartData, setCartData] = useState([]);
const url= 'eb0962d4ac7c4a7fa014a972a85aa726'
const fetchCartItems = async () => {
  try {
    const response = await fetch(
      `https://crudcrud.com/api/${url}/cart${userEmail}`
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setCartData(data);
      
    } else {
      console.error("Failed to retrieve cart items.");
    }
  } catch (error) {
    console.error("Error retrieving cart items:", error);
  }
};


/*const addItemHandler = async (item) => {
  fetchCartItems()
  try {
    const response = await fetch(
      `https://crudcrud.com/api/7c979eb94e7c45369266fd73b78cf1a5/cart${userEmail}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
    );

    if (response.ok) {
      setCartData((prevItems) => {console.log(userEmail)
        const existingItemIndex = prevItems.findIndex(
          (prevItem) => prevItem.title === item.title
        );

        if (existingItemIndex) {
          // Item already exists in the cart, show alert
          alert("Item already exists in the cart");
          return prevItems;
        } else {
          // Item is new, add it to the cart with quantity 1
          const newItem = { ...item, quantity: 1, id: item.title };
          return [...prevItems, newItem];
        }
      });
    } else {
      console.error("Failed to add item to the cart.");
    }
  } catch (error) {
    console.error("Error adding item to the cart:", error);
  }
};*/

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

    if (response.ok) {setCartData((prevItems) => {console.log(userEmail)
      const existingItemIndex = prevItems.findIndex(
        (prevItem) => prevItem.id === item.id
      );

      if (existingItemIndex!== -1) {
        // Item already exists in the cart, show alert
        alert("Item already exists in the cart");
        return prevItems;
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
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }, body: JSON.stringify(id),
        }
      );
  
      if (response.ok) {
        

  
        setCartData((prevItems) => {
          const updatedItems = prevItems.filter((item) => item.id !== id);
          return updatedItems;
        });fetchCartItems();
      } else {
        console.error('Failed to remove item from cart.');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
  

  
 
const logoutHandler=()=>{
  setToken(null);
 setUserMail('')
  localStorage.removeItem('token');

  setIsLoggedIn(false);
}
  const cartContext = {
userEmail:userEmail,
    token: token,
    isLoggedIn: isLoggedIn,
    cartItems: cartData,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    login: loginHandler,
    logout: logoutHandler,
    fetchData: fetchCartItems
  };

  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};
export default CartProvider
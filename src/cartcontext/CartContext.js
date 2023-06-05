import React from 'react';



const CartContext = React.createContext(
    {token: 'token',
        cartItems: [],
        addItem: (item)=>{},
        removeItems: (item)=>{},
        login: (user)=>{},
        isLoggedIn: 'isLoggedIn',
    }
)

export default CartContext;
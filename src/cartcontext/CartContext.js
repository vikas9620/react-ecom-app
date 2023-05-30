import React from 'react';



const CartContext = React.createContext(
    {
        cartItems: [],
        addItem: (item)=>{},
        removeItems: (item)=>{}
    }
)

export default CartContext;
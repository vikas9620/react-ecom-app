import React, { useState } from "react";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const cartElements = [
    {
      title: "Colors",

      price: 100,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",

      quantity: 2,
    },

    {
      title: "Black and white Colors",

      price: 50,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",

      quantity: 3,
    },

    {
      title: "Yellow and Black Colors",

      price: 70,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",

      quantity: 1,
    },
  ];
  return (
    <React.Fragment>
      <button className={classes.btn} onClick={handleShow}>
        cart <span>0</span>
      </button>

      {show && (
        <section className={classes.cart} onHide={handleClose}>
          <h2>CART</h2>
          <button className={classes.cancel} onClick={handleClose}>
            X
          </button>
          <div className={classes.cartHeader}>
            <span className={classes.cartitem}>ITEM</span>
            <span className={classes.cartprice}>PRICE</span>
            <span className={classes.cartquantity}>QUANTITY</span>
          </div>
          {cartElements.map((element) => (
            <div className={element.cartItems}>
            <div className={classes.carti}>
              <div className={classes.item}>
                <img src={element.imageUrl} alt='img' /> {element.title}
              </div>
              <div className={classes.price}>{element.price}</div>
              <div className={classes.quantity}>{element.quantity}</div>
              <button className={classes.btnbtn}>Remove</button>
            </div></div>
          ))}<div className={classes.bottom}> <span className={classes.amount}>Total $0</span>
          <button className={classes.btnPurchase}>Purchase</button></div>
        </section>
      )}
     
    </React.Fragment>
  );
};

export default Cart;

import classes from "./Cart.module.css";
import React, { useContext, useState } from "react";
import CartContext from "../../cartcontext/CartContext";

const Cart = () => {
  const { removeItem, userEmail, cartItems } =useContext(CartContext);
  const [show, setShow] = useState(false);
console.log(cartItems);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const totalAmount = cartItems.reduce((acc, item) => {
    return acc + item.price*item.quantity;
  }, 0);
  console.log(userEmail);
  console.log(totalAmount);

  return (
    <React.Fragment>
      <button className={classes.btn} onClick={handleShow}>
        cart <span>{cartItems.length}</span>
      </button>

      {show && (
        <section className={classes.cart}>
          <h2>CART</h2>
          <button className={classes.cancel} onClick={handleClose}>
            X
          </button>
          <div className={classes.cartHeader}>
            <span className={classes.cartitem}>ITEM</span>
            <span className={classes.cartprice}>PRICE</span>
            <span className={classes.cartquantity}>QUANTITY</span>
          </div>
          {cartItems.map((element) => (
            <div className={classes.cartItems} key={element.id}>
              <div className={classes.item}>
                <img src={element.imageUrl} alt="img" />
                <div className={classes.itemText}>{element.title}</div>
              </div>
              <div className={classes.price}>${element.price}</div>
              <div className={classes.quantity}>{element.quantity}</div>
              <button
                className={classes.btnbtn}
                onClick={() => removeItem(element.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className={classes.bottom}>
            <span className={classes.amount}>Total ${totalAmount}</span>
            <button className={classes.btnPurchase}>Purchase</button>
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default Cart;

import React from "react";
import classes from "./Store.module.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Cart from '../cart/Cart';
const Store = (props) => {
  const productsArr = [
    {
      title: "Colors",

      price: 100,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
    },

    {
      title: "Black and white Colors",

      price: 50,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
    },

    {
      title: "Yellow and Black Colors",

      price: 70,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
    },

    {
      title: "Blue Color",

      price: 100,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
    },
  ];

  return (
    <React.Fragment>
      <div className={classes.store}>
        <h1>The Generics</h1>
      </div>
      <Cart></Cart>
      <div className={classes.main}>
        <h2>Music</h2>
        <div className={classes.list}>
          {productsArr.map((product) => (
            <Card style={{ width: "18rem", margin: "2rem" ,padding: '1rem'}}>
              <Card.Title>{product.title}</Card.Title>
              <Card.Img
                className={classes.img}
                variant="top"
                src={product.imageUrl}
              />
              <Card.Body
                style={{
                  display: "flex",
                  margin: "8px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{product.price}</span>
                <Button variant="primary">Add To Cart</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Store;

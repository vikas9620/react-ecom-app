import React, { useContext } from "react";
import classes from "./Store.module.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Cart from "../cart/Cart";
import CartContext from "../../cartcontext/CartContext";
import { Link } from "react-router-dom";
const Store = () => {
  const productsArr = [
    {id: "1",
      title: "Colors",

      price: 100,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
    },

    {id: "2",
      title: "Black and white Colors",

      price: 50,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
    },

    {id: "5",
      title: "Yellow and Black Colors",

      price: 70,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
    },

    {id: "4",
      title: "Blue Color",

      price: 100,

      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
    },
  ];
  const { addItem, cartItems } = useContext(CartContext);

  const addToCartHandler = (product) => {
    addItem(product);
  };
  console.log(cartItems);
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
            <Card
              key={product.title}
              style={{ width: "18rem", margin: "2rem", padding: "1rem" }}
            >
              <Card.Title>{product.title}</Card.Title>
              <Link  to={`/store/${product.title}`}>
                {" "}
                <Card.Img
                  className={classes.img}
                  variant="top"
                  src={product.imageUrl}
                />
              </Link>
              <Card.Body
                style={{
                  display: "flex",
                  margin: "8px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{product.price}</span>
                <Button
                  variant="primary"
                  onClick={() => addToCartHandler(product)}
                >
                  Add To Cart
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Store;

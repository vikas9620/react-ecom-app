import React from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";

function ProductDetail() {
  const productsArr = [
    {
      title: "Colors",
      price: 100,
      imageUrls: [
        "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
      ],
      reviews: ["Review 1", "Review 2"],
    },
    {
      title: "Black and white Colors",
      price: 50,
      imageUrls: [
        "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
      ],
      reviews: ["Review 3", "Review 4"],
    },
    {
      title: "Yellow and Black Colors",
      price: 70,
      imageUrls: [
        "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
      ],
      reviews: ["Review 5", "Review 6"],
    },
    {
      title: "Blue Color",
      price: 100,
      imageUrls: [
        "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
      ],
      reviews: ["Review 7", "Review 8"],
    },
  ];

  const { productID } = useParams();
  const product = productsArr.find((product) => product.title === productID);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="product-detail">
      <h1>product detail</h1>
      <h2>{product.title}</h2>
      <div className="image-gallery">
        <img
          src={product.imageUrls}
          alt={`Product ${product.title}`}
          className="product-image"
        />
      </div>
      <h3>Reviews:</h3>
      <ul className="review-list">
        {product.reviews.map((review, index) => (
          <li key={index} className="review-item">
            {review}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductDetail;

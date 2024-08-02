import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Card from "./card";
import { ShopContext } from "../App";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AllProducts() {
  const { products, addToCart } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div className="all-products main-page">
      {loading ? <Skeleton height={50} /> : <h1> Shop anything you like </h1>}
      <div className="grid">
        {products.map((element) => (
          <Card
            image_src={element.image}
            heading={element.title}
            rating={element.rating}
            description={element.description}
            price={element.price}
            id={element.id}
            category={element.category}
            key={element.id}
            
          />
        ))}
      </div>
    </div>
  );
}

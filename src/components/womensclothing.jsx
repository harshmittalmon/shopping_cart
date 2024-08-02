import React, { useState, useEffect } from "react";
import Card from "./card";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Electronics() {
  const [womensList, setWomensList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/women's%20clothing")
      .then((res) => res.json())
      .then((res) => {
        setWomensList(res);
      });
  }, []);
  useEffect(
    ()=>{
      setLoading(false);
    },[]
  )


  return <div className="all-products main-page">
    {loading ? <Skeleton height={50} /> : <h1> Shop Women Items  </h1>}
    <div className="grid">
    {
      womensList.map(
        (element) => {
          return (
            <Card 
            image_src={element.image}
            heading = {element.title}
            rating = {element.rating}
            description={element.description}
            price= {element.price}
            id = {element.id}
            category={element.category}
            />
          )
        }
      )
    }
    </div>

  </div>;
}

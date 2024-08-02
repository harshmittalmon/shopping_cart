import React, { useState, useEffect } from "react";
import Card from "./card";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Electronics() {
  const [electronicsList, setElectronicsList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/electronics")
      .then((res) => res.json())
      .then((res) => {
        setElectronicsList(res);
      });
  }, []);
  console.log(electronicsList)
  useEffect(
    ()=>{
      setLoading(false);
    },[]
  )


  return <div className="all-products main-page">
    {loading ? <Skeleton height={50} /> : <h1> Shop Electronics </h1>}
    <div className="grid">
    {
      electronicsList.map(
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

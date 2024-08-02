import React, { useContext, useEffect,useState } from "react";
import star from "../assets/star.svg"
import emptyStar from "../assets/empty_star.svg"
import { ShopContext } from "../App";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
export default function Card({
  image_src,
  heading,
  rating,
  description,
  price,
  id,
  category,
}) {
  

  const [loading , setLoading ] = useState(true);
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false);
    },2000)
  },[])


  const {cartItems,addToCart,removeFromCart,products} = useContext(ShopContext);
  
  const renderStar = ( rating ) => {
    
    const totalStars = 5;
    const filledStars = Math.floor(rating.rate);
    const emptyStars = totalStars - filledStars;
    
    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<img key={`filled-${i}`} src={star} alt="Filled Star" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<img key={`empty-${i}`} src={emptyStar} alt="Empty Star" />);
    }
    return stars;
  };

  return (
    <div className="card">
      {
        loading ? <Skeleton height={150}/> : <div className="img-container flex justify-center align-center">
        <img src={image_src} alt="" />
     </div>
      }
      {loading ? <h3><Skeleton/></h3> : <h5>{heading} </h5>}
      
      {
        loading ? <Skeleton count={2}/> : <div className="card-rating flex space-between">
        <span>${price}</span>
        <span>
        {
          renderStar(rating)
        }
        </span>
        
      </div>
      }
      
       

      { loading ? <Skeleton/> :  
      cartItems.includes(id) ? 
        <button onClick={() => removeFromCart(id)}>Remove</button>
       : <button onClick={() => addToCart(id)}>
        Add
      </button>
      }
    </div>
  );
}

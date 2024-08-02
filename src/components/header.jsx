import React, { useEffect, useState, useContext } from "react";
import basket from "../assets/basket.svg";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import downarrow from "../assets/down-arrow.svg";
import cart from "../assets/cart.svg";
import { func } from "prop-types";
import { ShopContext } from "../App";

export default function Header() {
  const [categoryState, setCategoryState] = useState(false);
  const [cartState, setCartState] = useState(false);

  function openCart() {
    setCartState(true);
  }

  
  

  const { cartItems, addToCart , products,removeFromCart } = useContext(ShopContext);
  function sumArray(arr) {
    return arr.reduce((acc, currentValue) => acc + products[currentValue-1].quantity*products[currentValue-1].price, 0);
  }

  function closeCart() {
    setCartState(false);
  }
  useEffect(() => {
    if (categoryState) {
      window.addEventListener("click", setCategoryState(false));
      toggleCategoryState();
    }
  }, []);
  function toggleCategoryState() {
    const overlay = document.querySelector(".super-overlay");
    if (categoryState) {
      overlay.style.display = "none";
    } else {
      overlay.style.display = "block";
    }
    setCategoryState((categoryState) => !categoryState);
  }

  function openCart(e) {
    e.preventDefault();
    const cart = document.querySelector(".cart");
    cart.classList.add("activate-cart");
    const mainPage = document.querySelector(".main-page");
    mainPage.classList.add("move-left");
   
  }
  function closeShopping() {
    const cart = document.querySelector(".cart");
    cart.classList.remove("activate-cart");
    const mainPage = document.querySelector(".main-page");
    mainPage.classList.remove("move-left");
  }
  return (
    <>
      <div class="header flex space-between align-center">
        <div className={`main-logo flex align-center  `}>
          <span>
            <div>Your's</div>
            <div>Basket</div>
          </span>
          <img src={basket} alt="" />
        </div>

        <nav className="header-nav flex justify-right align-center">
          <span className="home-link">
            <Link to="/home">Home</Link>
          </span>
          <span className="category-link" onClick={() => toggleCategoryState()}>
            <a>Shop</a>
            <img
              src={downarrow}
              className={categoryState == false ? "" : "reverse-character"}
            />
          </span>
          <span className="cart-link">
            <Link>
              <img src={cart} alt="" onClick={openCart} />
            </Link>
            {cartItems.length > 0 ? (
              <div className="cart-count">{cartItems.length}</div>
            ) : (
              <div></div>
            )}
          </span>
          <div
            className={`sub-menu-wrap ${
              categoryState == false ? "not-show" : "show"
            }`}
          >
            <div className="sub-menu">
              <div className="sub-menu-list flex">
                <div className="sub-menu-list-link">
                  <Link onClick={toggleCategoryState} to="/shop/allproducts">
                    All Products
                  </Link>
                </div>
                <div className="sub-menu-list-link">
                  <Link onClick={toggleCategoryState} to="/shop/electronics">
                    Electronics
                  </Link>
                </div>
                <div className="sub-menu-list-link">
                  <Link onClick={toggleCategoryState} to="/shop/jewellery">
                    Jewellery
                  </Link>
                </div>
                <div className="sub-menu-list-link">
                  <Link onClick={toggleCategoryState} to="/shop/mensclothing">
                    Men's Clothing
                  </Link>
                </div>
                <div className="sub-menu-list-link">
                  <Link onClick={toggleCategoryState} to="/shop/womensclothing">
                    Women's Clothing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="cart">
        <h2> Cart Items{`(${cartItems.length})`}</h2>
        <ul className="listCard">
          {cartItems.map((item, index) => (
          
            
              <li key={item}>
              <div className = "item-container">
                <div >
                    <img src={products[item-1].image} alt={ products[item-1].title} />
                </div>
                <h3>{products[item-1].title}</h3>
                <div className = "cart-add-reduce-buttons">
                <button
                  onClick={()=>removeFromCart(item)}
                >
                  -
                </button>
                <span className="count">{products[item-1].quantity}</span>
                <button
                  onClick={()=>addToCart(item)}
                >
                  +
                </button>
                </div>
              </div>
              <div className="total-price"> 
                <span> {products[item-1].price}</span>
                <span> Total : {products[item-1].quantity * products[item-1].price}</span>
                 </div>
            </li>
            
          ))}
        </ul>

        <div className="checkOut">
          <div className="total"> {`Checkout ${sumArray(cartItems)}`} </div>
          <div className="close-shopping" onClick={closeShopping}>
            Close
          </div>
        </div>
      </div>

      <Outlet />
      <div className="super-overlay" onClick={toggleCategoryState}></div>
    </>
  );
}

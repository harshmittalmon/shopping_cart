import { useState, createContext } from "react";
import { useEffect } from "react";
import "./App.css";
import Header from "./components/header";
import Home from "./components/home";
import Mens from "./components/mensclothing";
import { v4 as uuidv4 } from "uuid";

export const ShopContext = createContext({
  cartItems: [],
  products: [],
  removeFromCart: (id) => {},
  addToCart: (id) => {},
});

export default function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const productsWithQuantity = data.map((product) => ({
          ...product,
          quantity: 0,
        }));
        setProducts(productsWithQuantity);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const addToCart = (id) => {
    setProducts((products) =>
      products.map((product) =>
        product.id === id ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
    setCartItems((cartItems) =>
      cartItems.includes(id) ? cartItems : [...cartItems, id]
    );
  };
  
  const removeFromCart = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity - 1 }  
          : product
      )
    );
    setCartItems((cartItems) =>
      
      {
        
        if(products[id-1].quantity==1)return cartItems.filter((item)=> item!== id);
        else return cartItems;
        
      }
    );
  };

  return (
    <ShopContext.Provider
      value={{ cartItems, products, addToCart, removeFromCart }}
    >
      <Header />
    </ShopContext.Provider>
  );
}

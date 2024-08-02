import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import Electronics from './components/electronics.jsx';
import Home from './components/home.jsx';
import Jewellery from './components/jewellery.jsx';
import Mensclothing from './components/mensclothing.jsx';
import Womensclothing from './components/womensclothing.jsx';
import AllProducts from './components/allproducts.jsx';

const router = createBrowserRouter(
  [
    {
      path:"/",
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        {path:"/home",element: <Home />},
        {path:"/shop/electronics",element: <Electronics />},
        {path:"/shop/jewellery",element: <Jewellery />},
        {path:"/shop/mensclothing",element: <Mensclothing />},
        {path:"/shop/womensclothing",element: <Womensclothing />},
        {path:"/shop/electronics",element: <Electronics />},
        {path:"/shop/allproducts",element:<AllProducts />},
      ]
    },
    
  ]
);
    
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

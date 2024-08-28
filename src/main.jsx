import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./index.css";
import ProductList from "./components/ProductList.jsx";
import ProductCreate from "./components/ProductCreate.jsx";
import Layout from "./components/Layout.jsx";

import Signup from "./auth/Signup.jsx";
import Login from "./auth/Login.jsx";
import CheckOut from "./components/CheckOut.jsx";
import Orders from "./components/Orders.jsx";
import ProductDetails from "./components/ProductDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProductList />,
      },
      {
        path: "/products/create",
        element: <ProductCreate />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/checkout/:id/",
        element: <CheckOut />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

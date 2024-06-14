import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";

const CheckOut = () => {
  const { id, user_id } = useParams();
  const [product, setProduct] = useState([]);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    if (id && user_id) {
      fetchProduct();
      fetchAddress();
    }
  }, [id, user_id]);

  function fetchProduct() {
    axios.get(`http://localhost:8080/products/${id}`).then((response) => {
      setProduct(response.data);
      console.log(response.data);
    });
  }

  function fetchAddress() {
    axios.get(`http://localhost:8080/addresses/${user_id}`).then((response) => {
      setAddress(response.data);
      console.log(response.data);
    });
  }

  return (
    <div>
      <h1>Checkout</h1>
      <div>
        <h2>Product Details</h2>
        <pre>{JSON.stringify(product, null, 2)}</pre>
      </div>
      <div>
        <h2>Address Details</h2>
        <pre>{JSON.stringify(address, null, 2)}</pre>
      </div>
    </div>
  );
};

export default CheckOut;

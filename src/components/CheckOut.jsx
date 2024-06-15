import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";

const CheckOut = () => {
  const { id, user_id } = useParams();
  const [product, setProduct] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    if (id && user_id) {
      fetchProduct();
      fetchAddress();
    }
  }, [id, user_id]);

  function fetchProduct() {
    axios
      .get(`http://localhost:8080/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }

  function fetchAddress() {
    axios
      .get(`http://localhost:8080/addresses/${user_id}`)
      .then((response) => {
        setAddresses(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching address:", error);
      });
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="mb-6 p-4 border rounded shadow">
        <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
      </div>
      <div className="flex flex-wrap gap-6">
        {addresses.map((address, index) => (
          <div
            key={index}
            className="card w-96 bg-base-100 shadow-xl flex-grow"
          >
            <div className="card-body">
              <h2 className="card-title">Shipping Address</h2>
              <div className="flex flex-row">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="shippingAddress"
                    value={index}
                    checked={selectedAddress === index}
                    onChange={() => setSelectedAddress(index)}
                    className="mr-2"
                  />
                  <span>
                    <p>{address.street}</p>
                    <p>{address.city}</p>
                    <p>{address.state}</p>
                    <p>{address.pin_code}</p>
                  </span>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card-actions mt-4">
        <button className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded">
          Pay Rs.{product.price} and place order
        </button>
      </div>
    </div>
  );
};

export default CheckOut;

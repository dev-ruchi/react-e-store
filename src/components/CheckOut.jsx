import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";

const CheckOut = () => {
  const { id, user_id } = useParams();
  const [product, setProduct] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin_code, setPin_code] = useState("");

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
        console.log("Address response data:", response.data);
        if (Array.isArray(response.data)) {
          setAddresses(response.data);
          // Default to select the first address initially
          if (response.data.length > 0) {
            setSelectedAddress(0);
          }
        } else {
          console.error("Expected array of addresses but got:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching address:", error);
      });
  }

  function addAddress() {
    axios
      .post(`http://localhost:8080/address`)
      .then((response) => {
        setAddress(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Could not add address:", error);
      });
  }

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="mb-6 p-4 border rounded shadow">
        <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
      </div>
      <div className="flex flex-wrap gap-6 card w-96 bg-base-100 shadow-xl flex-grow">
        {addresses.map((address, index) => (
          <div key={index} className="">
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
        <div onClick={toggleFormVisibility} style={{ cursor: "pointer" }}>
          <h1 className="text-2xl font-semibold ml-6">
            + Add new address
          </h1>
        </div>

        <div className="container mx-auto p-4 max-w-lg">
          {isFormVisible && (
            <form
              onSubmit={addAddress}
              className="p-8 space-y-6"
            >
              <div className="form-control mb-4">
                <label htmlFor="street" className="label font-semibold">
                  <span className="label-text">Street</span>
                </label>
                <input
                  className="input input-bordered w-full"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  type="text"
                  placeholder="Street"
                />
              </div>
              <div className="form-control">
                <label htmlFor="city" className="label font-semibold">
                  <span className="label-text">City</span>
                </label>
                <input
                  className="input input-bordered w-full"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  placeholder="City"
                />
              </div>
              <div className="form-control">
                <label htmlFor="state" className="label font-semibold">
                  <span className="label-text">State</span>
                </label>
                <input
                  className="input input-bordered w-full"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  type="text"
                  placeholder="State"
                />
              </div>
              <div className="form-control">
                <label htmlFor="pincode" className="label font-semibold">
                  <span className="label-text">Pincode</span>
                </label>
                <input
                  className="input input-bordered w-full"
                  value={pin_code}
                  onChange={(e) => setPin_code(e.target.value)}
                  type="text"
                  placeholder="Pincode"
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mx-24 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                type="submit"
              >
                Add
              </button>
            </form>
          )}
        </div>
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

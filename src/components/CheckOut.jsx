import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";

const CheckOut = () => {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const [product, setProduct] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin_code, setPin_code] = useState("");

  useEffect(() => {
    if (id) {
      fetchProduct();
      fetchAddress();
    }
  }, [id]);

  function placeOrder() {
    axios
      .post(`http://localhost:8080/orders`, {
        user_id: parseInt(userId),
        product_id: parseInt(product.id),
        quantity: 1,
        total_price: parseFloat(product.price),
        status: "pending",
      })
      .then((response) => {
        console.log(response.data);
      });
  }

  function fetchProduct() {
    axios
      .get(`http://localhost:8080/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }

  function fetchAddress() {
    axios
      .get(`http://localhost:8080/addresses/${userId}`)
      .then((response) => {
        setAddresses(response.data);
        if (Array.isArray(response.data)) {
          setAddresses(response.data);
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

  function addAddress(e) {
    e.preventDefault();

    const payload = {
      street: street,
      city: city,
      state: state,
      pin_code: pin_code,
      user_id: parseInt(userId),
    };

    axios
      .post(`http://localhost:8080/address`, payload)
      .then(({ data }) => {
        setAddresses((oldVal) => {
          const newAddresses = [...oldVal, data];
          setSelectedAddress(newAddresses.length - 1);
          return newAddresses;
        });
        setStreet("");
        setCity("");
        setState("");
        setPin_code("");
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
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
      </div>
      <div className="flex mb-8">
        <div className="flex flex-wrap card w-96 bg-base-100 shadow-xl flex-grow">
          <h2 className="card-title my-8 mx-6 text-3xl">Shipping Address</h2>
          <div className="mb-4">
            <div className="grid md:grid-cols-2 xl:grid-cols-3">
              {addresses.map((address, index) => (
                <div key={index}>
                  <div className="card-body py-2">
                    <div className="p-4 bg-base-200 rounded-lg shadow-md">
                      <label className="flex items-start space-x-4">
                        <input
                          type="radio"
                          name="shippingAddress"
                          value={index}
                          checked={selectedAddress === index}
                          onChange={() => setSelectedAddress(index)}
                          className="radio radio-primary"
                        />
                        <span className="text-left">
                          <p className="font-semibold text-lg">
                            {address.street}
                          </p>
                          <p className="text-gray-600">{address.city}</p>
                          <p className="text-gray-600">{address.state}</p>
                          <p className="text-gray-600">{address.pin_code}</p>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div onClick={toggleFormVisibility} style={{ cursor: "pointer" }}>
            <h1 className="text-2xl font-semibold ml-6">+ Add new address</h1>
          </div>

          <div className="p-4 lg:w-1/2">
            {isFormVisible && (
              <form onSubmit={addAddress} className="p-8 space-y-6">
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
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  type="submit"
                >
                  Add
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded"
        onClick={placeOrder}
      >
        Pay ₹ {product.price} and place order
      </button>
    </div>
  );
};

export default CheckOut;

import React from "react";
import { useState } from "react";
import axios from "axios";

const ProductCreate = () => {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  function addProduct(e) {
    e.preventDefault();

    const payload = {
      title: title,
      price: parseFloat(price),
      description: description,
      rating: parseFloat(rating),
      user_id: userId,
    };

    axios
      .post("http://localhost:8080/products", payload)
      .then((response) => {
        console.log(response.data);
        setProducts((oldProducts) => [...oldProducts, response.data]);
        setTitle("");
        setPrice("");
        setDescription("");
        setRating("");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      {
        <div className="container mx-auto p-4 max-w-lg">
          <form
            onSubmit={addProduct}
            className="form bg-white shadow-xl rounded-lg p-8 space-y-6"
          >
            <div className="form-control mb-4">
              <label htmlFor="title" className="label font-semibold">
                <span className="label-text">Enter new Product</span>
              </label>

              <input
                className="input input-bordered w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Product Title"
              />
            </div>
            <div className="form-control">
              <label htmlFor="price" className="label font-semibold">
                <span className="label-text">Price</span>
              </label>
              <input
                id="price"
                className="input input-bordered w-full"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="Product Price"
              />
            </div>

            <div className="form-control">
              <label htmlFor="rating" className="label font-semibold">
                <span className="label-text">Rating</span>
              </label>
              <input
                id="rating"
                className="input input-bordered w-full"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                type="number"
                placeholder="Product Rating"
              />
            </div>

            <div className="form-control">
              <label htmlFor="description" className="label font-semibold">
                <span className="label-text">Description</span>
              </label>
              <input
                id="description"
                className="input input-bordered w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Product Description"
              />
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mx-44 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              type="submit"
            >
              Add
            </button>
          </form>
        </div>
      }
    </>
  );
};

export default ProductCreate;

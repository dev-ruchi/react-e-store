import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backend from "@/network/backend";

const ProductCreate = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token");

  const isValidToken = (token) => token && token.length > 0;
  useEffect(() => {
    const token = getToken();
    if (!isValidToken(token)) {
      setIsTokenValid(false);
      navigate("/login"); // Redirect to login page
    }
  }, [navigate]);

  function addProduct(e) {
    e.preventDefault();

    const token = getToken();
    if (!isValidToken(token)) {
      alert("Session expired. Please log in again.");
      navigate("/login"); // Redirect to login page
      return;
    }

    const payload = {
      title,
      price: parseFloat(price),
      description: description,
      rating: parseFloat(rating),
      images,
    };

    backend
      .post("/products", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert("Product saved.");
        setTitle("");
        setPrice("");
        setDescription("");
        setRating("");
      })
      .catch((error) => {
        alert("Something went wrong.");
        console.log(error);
      });
  }

  function uploadImages(e) {
    e.preventDefault();

    const formData = new FormData();

    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      formData.append(`files[]`, files[i]);
    }

    backend
      .post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setImages(res.data.files);
      });
  }

  if (!isTokenValid) {
    return null;
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
              <textarea
                id="description"
                className="input input-bordered w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Product Description"
              ></textarea>
            </div>

            <div className="form-control">
              <label className="label">Images</label>
              <input
                id="images"
                className="file-input file-input-bordered"
                type="file"
                onChange={uploadImages}
                multiple
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

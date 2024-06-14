import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProducts() {
    axios.get(`http://localhost:8080/products`).then((response) => {
      setProducts(response.data);
      console.log(response.data);
    });
  }

  const handleBuyClick = (productId) => {
    console.log("Product ID:", productId);
  };

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 auto-rows-fr w-fit mx-auto gap-16">
      {products.map((product) => (
        <div
          key={`product-${product.id}`}
          className="card w-80 bg-base-100 shadow-xl"
        >
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body p-6">
            {/* <button
              title="Delete"
              className="btn btn-error btn-sm ml-auto"
              onClick={() => deleteProduct(product.id)}
            >
              X
            </button> */}
            <h2
              className="card-title text-2xl font-bold text-gray-800 line-clamp-1"
              title={product.title}
            >
              {product.title}
            </h2>

            <p className="text-xl text-gray-600">₹{product.price}</p>
            <p className=" text-gray-700 truncate">{product.description}</p>
            <span className="inline-block align-middle mb-4 text-yellow-500">
              {Array.from({ length: Math.round(product.rating) }, (_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 inline-block fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.435 8.2 1.193-5.934 5.787 1.4 8.165-7.334-3.857-7.334 3.857 1.4-8.165-5.934-5.787 8.2-1.193z" />
                </svg>
              ))}
            </span>
            <button
              className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleBuyClick(product.id)}
            >
              Buy
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

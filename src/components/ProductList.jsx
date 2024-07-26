import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProducts() {
    axios.get(`http://localhost:8080/products`).then((response) => {
      setProducts(response.data);
    });
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 auto-rows-fr w-fit mx-auto gap-16">
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <div
            key={`product-${product.id}`}
            className="card w-80 bg-base-100 shadow-xl"
          >
            <figure>
              <img
                className="max-h-[200px] object-cover"
                src={`http://localhost:8080/files/${product.images[0]}`}
                alt="Shoes"
              />
            </figure>
            <div className="card-body p-6">
              <h2
                className="card-title text-2xl font-bold text-gray-800 line-clamp-1"
                title={product.title}
              >
                {product.title}
              </h2>

              <p className="text-xl text-gray-600"> ₹{product.price}</p>
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
              <Link
                to={`/checkout/${product.id}`}
                className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded text-center"
              >
                Buy
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No product found.</p>
      )}
    </div>
  );
};

export default ProductList;

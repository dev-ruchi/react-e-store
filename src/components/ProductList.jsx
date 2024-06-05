import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
   
      fetchProduts();
    
  }, []);


  function fetchProduts() {
    axios.get(`http://localhost:8080/products`).then((response) => {
      setProducts(response.data);
      console.log(response.data);
    });
  }

  return (
    <div>
      <ul className="">
        {products.map((product) => (
          <li className="mt-8" key={`product-${product.id}`}>
            <div className="card w-96 bg-base-100 shadow-xl">
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
                <h2 className="card-title text-2xl font-bold text-gray-800">
                  {product.title}
                </h2>

                <p className="text-xl text-gray-600">₹{product.price}</p>
                <p className="mt-2 text-gray-700">{product.description}</p>
                <span className="inline-block align-middle">
                  {Array.from(
                    { length: Math.round(product.rating) },
                    (_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 inline-block fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .587l3.668 7.435 8.2 1.193-5.934 5.787 1.4 8.165-7.334-3.857-7.334 3.857 1.4-8.165-5.934-5.787 8.2-1.193z" />
                      </svg>
                    )
                  )}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

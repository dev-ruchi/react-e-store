import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import backend from "@/network/backend";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  function fetchProductDetail() {
    backend.get(`/products/${id}`).then((response) => {
      setProduct(response.data);
    });
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left column with smaller images */}
        <div className="flex-shrink-0">
          {product.images && product.images.length > 0 ? (
            <div className="flex flex-row md:flex-col gap-4">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  className={`object-contain cursor-pointer ${
                    index === selectedImageIndex
                      ? "h-[80px] w-[80px] border-2 border-blue-700 opacity-50"
                      : "h-[80px] w-[80px] border border-gray-300"
                  }`}
                  src={`http://localhost:8080/files/${image}`}
                  alt={`Product image ${index + 1}`}
                  onClick={() => setSelectedImageIndex(index)}
                />
              ))}
            </div>
          ) : (
            <p>No image available.</p>
          )}
        </div>

        {/* Right side with the larger image and product details */}
        <div className="flex flex-col md:flex-row gap-8">
          {product.images && product.images.length > 0 && (
            <div className="flex-shrink-0">
              <img
                className="h-[400px] w-[400px] object-contain"
                src={`http://localhost:8080/files/${product.images[selectedImageIndex]}`}
                alt={`Product image ${selectedImageIndex + 1}`}
              />
            </div>
          )}

          {/* Product details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {product.title}
              </h1>
              <p className="text-2xl text-gray-600 mb-4">₹{product.price}</p>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <span className="inline-block align-middle mb-4 text-yellow-500">
                {Array.from({ length: Math.round(product.rating) }, (_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 inline-block fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.435 8.2 1.193-5.934 5.787 1.4 8.165-7.334-3.857-7.334 3.857 1.4-8.165-5.934-5.787 8.2-1.193z" />
                  </svg>
                ))}
              </span>
            </div>
            <Link
              to={`/checkout/${product.id}`}
              className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-4 px-8 rounded text-center"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

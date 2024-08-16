import React from "react";
import { useState, useEffect } from "react";
import backend from "@/network/backend";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    backend.get("/orders").then((response) => {
      setOrders(response.data);
      console.log(response.data);
    });
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="p-4 bg-white rounded shadow">
          <p className="text-lg font-semibold">
            Total Price: {order.total_price}
          </p>
          <p className="text-md">Quantity: {order.quantity}</p>
          <p
            className={`text-md ${
              order.status === "delivered" ? "text-green-500" : "text-red-500"
            }`}
          >
            Status: {order.status}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Orders;

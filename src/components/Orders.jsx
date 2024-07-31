import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    axios.get(`http://localhost:8080/orders/${userId}`).then((response) => {
      setOrders(response.data);
      console.log(response.data);
    });
  }

  return (
    <div className="space-y-4">
    {orders.map((order) => (
      <div key={order.id} className="p-4 bg-white rounded shadow">
        <p className="text-lg font-semibold">Total Price: {order.total_price}</p>
        <p className="text-md">Quantity: {order.quantity}</p>
        <p className={`text-md ${order.status === 'delivered' ? 'text-green-500' : 'text-red-500'}`}>Status: {order.status}</p>
      </div>
    ))}
  </div>
  );
}

export default Orders;

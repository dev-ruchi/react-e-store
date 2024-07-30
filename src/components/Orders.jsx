import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

    
  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    axios.get(`http://localhost:8080/orders/1`).then((response) => {
      setOrders(response.data);
      console.log(response.data);
    });
  }

  return (
  <div>
{
  orders.map((order) => (
    <div key={order.id}>
      <p>{order.total_price}</p>
      <p>{order.quantity}</p>
      <p>{order.status}</p>
    </div>
  ))
}
  </div>
  )
}

export default Orders;

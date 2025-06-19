'use client';
import { useEffect, useState } from 'react';
import UserLayout from '../layouts/UserLayout';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem('orders') || '[]'));
  }, []);

  return (
    <UserLayout>
      <h1>Your Orders</h1>
      {orders.length === 0 ? <p>No orders found.</p> : (
        orders.map(order => (
          <div key={order.id} className="order">
            <h2>Order #{order.id}</h2>
            <p>Status: {order.status}</p>
            <ul>
              {order.items.map(item => (
                <li key={item.id}>{item.title} - {item.price} USD</li>
              ))}
            </ul>
            <h4>Total: {order.total} USD</h4>
          </div>
        ))
      )}
    </UserLayout>
  );
}
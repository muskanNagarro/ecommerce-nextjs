'use client';
import React from 'react';
import { useEffect, useState } from 'react';

export default function ProfileOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(data);
    setFiltered(data);
  }, []);

  useEffect(() => {
    if (statusFilter === 'All') {
      setFiltered(orders);
    } else {
      setFiltered(orders.filter(order => order.status === statusFilter));
    }
  }, [statusFilter, orders]);

  const statuses = ['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'];

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <label className="font-medium">Filter by status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((order) => (
            <li key={order.id} className="bg-white shadow p-4 rounded">
              <p className="font-semibold">Order #{order.id}</p>
              <p className="text-sm text-gray-600">Items: {order.items.length}</p>
              <p className="text-sm">Total: ₹{order.total.toFixed(2)}</p>
              <p className="text-sm text-blue-600">Status: {order.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

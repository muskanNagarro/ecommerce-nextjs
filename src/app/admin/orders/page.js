'use client';
import { useEffect, useState } from 'react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);
  }, []);

  const updateStatus = (id, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Order Management</h1>

        {orders.length === 0 ? (
          <p className="text-gray-600">No orders available.</p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white p-4 rounded shadow space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">
                      Placed on {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-700">₹{order.total.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">
                      Items: {order.items?.length || 0}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium">Status:</span>
                  <select
                    value={order.status}
                    onChange={e => updateStatus(order.id, e.target.value)}
                    className="ml-2 border px-2 py-1 rounded"
                  >
                    <option>Pending</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>

                <div>
                  <p className="font-semibold text-sm">Items:</p>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {order.items.map(item => (
                      <li key={item.id}>
                        {item.title} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
  );
}

'use client';
import React from 'react';
import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, total, setCart } = useContext(CartContext); // ✅ import setCart
  const [orderPlaced, setOrderPlaced] = useState(false);
  const router = useRouter();

  const handlePlaceOrder = () => {
    // Simulate placing order
    setOrderPlaced(true);

    // Save order to localStorage (optional)
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrder = {
      id: Date.now(),
      items: cart,
      total,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));

    // Clear cart from localStorage and context
    localStorage.removeItem('cart');
    setCart([]); // ✅ clear CartContext too

    // Redirect after a short delay
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {orderPlaced ? (
        <div className="text-green-600 text-lg font-semibold">✅ Order placed successfully!</div>
      ) : (
        <>
          <div className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
            {cart.map(item => (
              <div key={item.id} className="flex justify-between border-b py-2">
                <span>{item.title} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="text-right font-bold mt-4">Total: ₹{total.toFixed(2)}</div>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

'use client';
import React from 'react';
import { useContext } from 'react';
import Link from 'next/link';
import { CartContext } from '../context/CartContext';

export default function CartPage() {
  const { cart, increment, decrement, total } = useContext(CartContext);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link href="/" className="text-blue-600">Go shopping</Link>.</p>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded shadow">
              <div className="flex items-center gap-4">
                <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded" />
                <div>
                  <h2 className="text-lg font-medium">{item.title}</h2>
                  <p className="text-sm text-gray-600">${item.price} each</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => decrement(item.id)} className="px-2 py-1 bg-red-500 text-white rounded">-</button>
                <span className="font-semibold">{item.quantity}</span>
                <button onClick={() => increment(item.id)} className="px-2 py-1 bg-green-500 text-white rounded">+</button>
              </div>
            </div>
          ))}
          <div className="text-right text-lg font-bold mt-4">Total: ${total.toFixed(2)}</div>
          <Link href="/checkout" className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 mt-4">
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
}

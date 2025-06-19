'use client';
import React from 'react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { cart, addToCart, increment, decrement } = useContext(CartContext);
  const itemInCart = cart.find(item => item.id === product.id);
  const quantity = itemInCart?.quantity || 0;

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col">
      <img src={product.thumbnail} alt={product.title} className="h-48 w-full object-cover rounded mb-2" />
      <h2 className="text-lg font-semibold">{product.title}</h2>
      <p className="text-gray-600 mb-2">${product.price}</p>

      {quantity === 0 ? (
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-auto"
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => decrement(product.id)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              -
            </button>
            <span className="font-semibold">{quantity}</span>
            <button
              onClick={() => increment(product.id)}
              className="px-2 py-1 bg-green-500 text-white rounded"
            >
              +
            </button>
          </div>
          <span className="text-sm text-gray-500">In cart</span>
        </div>
      )}
    </div>
  );
}

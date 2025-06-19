'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function AddProduct() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const newProduct = {
      ...form,
      id: uuidv4(),
      price: parseFloat(form.price.trim()),
      title: form.title.trim(),
      description: form.description.trim(),
      image: form.image.trim(),
    };

    localStorage.setItem('products', JSON.stringify([...products, newProduct]));
    router.push('/admin/products');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={form.title}
          placeholder="Title"
          required
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="number"
          value={form.price}
          placeholder="Price"
          required
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <textarea
          value={form.description}
          placeholder="Description"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="text"
          value={form.image}
          placeholder="Image URL"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Add Product
        </button>
      </form>
    </div>
  );
}

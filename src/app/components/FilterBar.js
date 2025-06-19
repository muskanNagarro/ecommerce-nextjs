'use client';
import { useState } from 'react';

export default function FilterBar({ categories, onFilter }) {
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [search, setSearch] = useState('');

  const applyFilters = () => {
    onFilter({ category, maxPrice, search });
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <label className="block text-sm font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-1 rounded w-full"
        >
          <option value="">All</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Max Price</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border px-3 py-1 rounded w-full"
          placeholder="1000"
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium">Search</label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Product name"
          className="border px-3 py-1 rounded w-full"
        />
      </div>

      <button
        onClick={applyFilters}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2 md:mt-0"
      >
        Apply
      </button>
    </div>
  );
}

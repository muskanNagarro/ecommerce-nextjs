'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editProduct, setEditProduct] = useState(null);

  const productsPerPage = 5;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(saved);
  }, []);

  const saveToLocal = (data) => {
    localStorage.setItem('products', JSON.stringify(data));
    setProducts(data);
  };

  const handleDelete = (id) => {
    const updated = products.filter(p => p.id !== id);
    saveToLocal(updated);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updated = products.map(p =>
      p.id === editProduct.id ? editProduct : p
    );
    saveToLocal(updated);
    setEditProduct(null);
  };

  const filtered = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + productsPerPage);

  return (
    
      <div className="max-w-5xl mx-auto p-4">
        <p className="text-gray-600">Welcome to the admin panel. Use the sidebar to manage the store.</p>
          <h1 className="text-2xl font-bold mb-4 mt-4">Manage Products</h1>

         <div className="mb-4 flex justify-between">
        <input
            type="text"
            placeholder="Search products..."
            className="w-full border px-4 py-2 mb-4 rounded"
            value={searchTerm}
            onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
            }}
            />
            <Link href="/admin/products/add" className="bg-green-600 text-white px-4 py-2 rounded ml-4 hover:bg-green-700">
            Add Product
            </Link>
        </div>

        {paginated.map(product => (
          <div
            key={product.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center mb-3"
          >
            <div>
              <h2 className="text-lg font-bold">{product.title}</h2>
              <p className="text-sm text-gray-500">₹{product.price} — {product.category}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditProduct(product)}
                className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Edit Form */}
        {editProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form
              onSubmit={handleEditSubmit}
              className="bg-white p-6 rounded w-full max-w-md space-y-4"
            >
              <h2 className="text-xl font-bold">Edit Product</h2>
              <input
                type="text"
                value={editProduct.title}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, title: e.target.value })
                }
                placeholder="Title"
                className="w-full border px-4 py-2 rounded"
                required
              />
              <input
                type="number"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, price: +e.target.value })
                }
                placeholder="Price"
                className="w-full border px-4 py-2 rounded"
                required
              />
              <input
                type="text"
                value={editProduct.category}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, category: e.target.value })
                }
                placeholder="Category"
                className="w-full border px-4 py-2 rounded"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditProduct(null)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
  );
}

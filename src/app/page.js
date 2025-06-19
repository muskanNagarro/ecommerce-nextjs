'use client';
import { useEffect, useState, useContext } from 'react';
import ProductCard from './components/ProductCard';
import FilterBar from './components/FilterBar';
import { AuthContext } from './context/AuthContext';
import AdminProductsPage from './admin/products/page';
import AdminLayout from './layouts/AdminLayout';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const { user } = useContext(AuthContext);
  console.log('user', user)

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setDisplayed(data.products);
      });
  }, []);

  const handleFilter = ({ category, maxPrice, search }) => {
    let filtered = [...products];

    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }

    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));
    }

    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        p => p.title.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
      );
    }

    setDisplayed(filtered);
  };

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <>
    {user && !user.isAdmin && (
    <div className="max-w-6xl mx-auto p-4">
      <FilterBar categories={categories} onFilter={handleFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayed.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>)}

    {user && user.isAdmin && <AdminLayout><AdminProductsPage /></AdminLayout>}

    </>
  );
}

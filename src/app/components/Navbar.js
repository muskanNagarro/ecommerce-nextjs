'use client';
import React from 'react';
import { useEffect, useRef, useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow">
      <Link href="/" className="text-xl font-bold">
        ShopIt
      </Link>

      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        {user && !user.isAdmin && (
          <Link href="/cart" className="relative">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        )}

        {user && user.isAdmin && (
          <>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
            >
              Admin
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-12 bg-white text-gray-700 border mt-1 rounded shadow w-40 z-50">
                <button
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        )}

        {user ? (
          <>
          {!user.isAdmin && (
            <>
             <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
            >
              Profile
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-12 bg-white text-gray-700 border mt-1 rounded shadow w-40 z-50">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}  
            </>
          )}        
          </>
        ) : (
          <div className="flex gap-3">
            <Link
              href="/login"
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

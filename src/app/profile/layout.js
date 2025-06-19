'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ProfileLayout({ children }) {
  const pathname = usePathname();

  const links = [
    { href: '/profile', label: 'My Profile' },
    { href: '/profile/orders', label: 'Order History' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Account Dashboard</h1>

      <div className="flex flex-wrap gap-3 mb-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`px-4 py-2 rounded font-medium transition ${
              pathname === href
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="bg-white p-6 rounded shadow">{children}</div>
    </div>
  );
}

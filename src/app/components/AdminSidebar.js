'use client';
import Link from 'next/link';

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white border-r p-4 shadow-md min-h-screen">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        <li><Link href="/admin/products">Products</Link></li>
        <li><Link href="/admin/orders">Orders</Link></li>
      </ul>
    </aside>
  );
}

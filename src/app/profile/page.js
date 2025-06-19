'use client';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  const displayName = user?.name || 'Guest User';
  const displayEmail = user?.email || 'guest@example.com';

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-blue-700">My Profile</h1>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-lg">
          <strong>Name:</strong> {displayName}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {displayEmail}
        </p>
      </div>
    </div>
  );
}

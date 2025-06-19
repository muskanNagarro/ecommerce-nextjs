'use client';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on first load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const register = ({ name, email, password }) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Prevent duplicate email
  if (users.find(u => u.email === email)) {
    return { success: false, message: 'User already exists' };
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    isAdmin: false, // Always create regular user
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('user', JSON.stringify(newUser));
  setUser(newUser);

  return { success: true };
};


  const login = (username, password) => {
    // For demo purposes: hardcoded users
    const fakeUsers = [
      { username: 'admin', password: 'admin', isAdmin: true },
      { username: 'user', password: 'user', isAdmin: false },
    ];

    const foundUser = fakeUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

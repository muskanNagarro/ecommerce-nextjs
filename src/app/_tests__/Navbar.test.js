import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';

// Mock router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Navbar Component', () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    localStorage.setItem(
      'cart',
      JSON.stringify([{ id: 1, name: 'Product A', quantity: 2 }])
    );
  });

  const renderNavbar = (user = null) => {
    render(
      <AuthContext.Provider value={{ user, logout: mockLogout }}>
        <Navbar />
      </AuthContext.Provider>
    );
  };

  it('renders brand name', () => {
    renderNavbar();
    expect(screen.getByText('ShopIt')).toBeInTheDocument();
  });

  it('shows Login/Register when no user is logged in', () => {
    renderNavbar();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('shows Cart for logged in normal user', () => {
    renderNavbar({ isAdmin: false });
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  it('displays cart count from localStorage', () => {
    renderNavbar({ isAdmin: false });
    expect(screen.getByText('2')).toBeInTheDocument(); // quantity from localStorage
  });

  it('shows Admin Dashboard link for admin user', () => {
    renderNavbar({ isAdmin: true });
    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
  });

  it('shows dropdown when profile is clicked', () => {
    renderNavbar({ isAdmin: false });
    fireEvent.click(screen.getByText('Profile'));
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('calls logout and redirects on logout click', () => {
    renderNavbar({ isAdmin: false });
    fireEvent.click(screen.getByText('Profile'));
    fireEvent.click(screen.getByText('Logout'));
    expect(mockLogout).toHaveBeenCalled();
  });
});

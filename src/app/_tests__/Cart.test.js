import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartPage from '../cart/page';
import { CartContext } from '../context/CartContext';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

describe('CartPage', () => {
  const increment = jest.fn();
  const decrement = jest.fn();

  const renderCart = (cartItems = []) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return render(
      <CartContext.Provider value={{ cart: cartItems, total, increment, decrement }}>
        <CartPage />
      </CartContext.Provider>
    );
  };

  it('displays empty cart message when cart is empty', () => {
    renderCart([]);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.getByText(/go shopping/i)).toBeInTheDocument();
  });

  it('renders cart items when cart is not empty', () => {
    const cartItems = [
      { id: 1, title: 'Product A', price: 100, quantity: 2, thumbnail: 'img.jpg' },
    ];
    renderCart(cartItems);

    expect(screen.getByText('Product A')).toBeInTheDocument();
    expect(screen.getByText('$100 each')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Total: $200.00')).toBeInTheDocument();
  });

  it('calls increment and decrement when buttons are clicked', () => {
    const cartItems = [
      { id: 1, title: 'Product A', price: 100, quantity: 2, thumbnail: 'img.jpg' },
    ];
    renderCart(cartItems);

    fireEvent.click(screen.getByText('+'));
    expect(increment).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText('-'));
    expect(decrement).toHaveBeenCalledWith(1);
  });

  it('has link to checkout page', () => {
    const cartItems = [
      { id: 1, title: 'Product A', price: 100, quantity: 1, thumbnail: 'img.jpg' },
    ];
    renderCart(cartItems);

    const checkoutLink = screen.getByRole('link', { name: /proceed to checkout/i });
    expect(checkoutLink).toHaveAttribute('href', '/checkout');
  });
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CheckoutPage from '../checkout/page';
import { CartContext } from '../context/CartContext';
import { useRouter } from 'next/navigation';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CheckoutPage', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ push: pushMock });
  });

  const mockCart = [
    { id: 1, title: 'Product A', quantity: 2, price: 100 },
    { id: 2, title: 'Product B', quantity: 1, price: 50 },
  ];

  const renderWithCart = () =>
    render(
      <CartContext.Provider value={{ cart: mockCart, total: 250, setCart: jest.fn() }}>
        <CheckoutPage />
      </CartContext.Provider>
    );

  it('renders checkout heading and order summary', () => {
    renderWithCart();
    expect(screen.getByText('Checkout')).toBeInTheDocument();
    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('Product A × 2')).toBeInTheDocument();
    expect(screen.getByText('₹200.00')).toBeInTheDocument();
    expect(screen.getByText('Total: ₹250.00')).toBeInTheDocument();
  });

  it('places order and shows success message', async () => {
    renderWithCart();
    const placeOrderBtn = screen.getByText('Place Order');
    fireEvent.click(placeOrderBtn);

    await waitFor(() => {
      expect(screen.getByText(/order placed successfully/i)).toBeInTheDocument();
    });
  });

  it('redirects to home after order', async () => {
    jest.useFakeTimers();
    renderWithCart();
    fireEvent.click(screen.getByText('Place Order'));
    jest.runAllTimers();

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/');
    });

    jest.useRealTimers();
  });
});

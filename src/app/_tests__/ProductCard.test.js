import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../context/CartContext';

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    thumbnail: 'test-thumbnail.jpg',
  };

  const renderWithCart = (cartItems = []) => {
    const addToCart = jest.fn();
    const increment = jest.fn();
    const decrement = jest.fn();

    render(
      <CartContext.Provider
        value={{ cart: cartItems, addToCart, increment, decrement }}
      >
        <ProductCard product={mockProduct} />
      </CartContext.Provider>
    );

    return { addToCart, increment, decrement };
  };

  it('renders product information correctly', () => {
    renderWithCart([]);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toHaveAttribute('src', 'test-thumbnail.jpg');
  });

  it('shows Add to Cart button when product is not in cart', () => {
    const { addToCart } = renderWithCart([]);
    const button = screen.getByText(/add to cart/i);
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(addToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('shows quantity controls when product is in cart', () => {
    const cartItems = [{ ...mockProduct, quantity: 2 }];
    const { increment, decrement } = renderWithCart(cartItems);

    expect(screen.getByText('2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('+'));
    expect(increment).toHaveBeenCalledWith(mockProduct.id);

    fireEvent.click(screen.getByText('-'));
    expect(decrement).toHaveBeenCalledWith(mockProduct.id);

    expect(screen.getByText(/in cart/i)).toBeInTheDocument();
  });
});

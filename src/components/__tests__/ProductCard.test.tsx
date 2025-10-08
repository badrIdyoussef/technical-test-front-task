import { render, screen } from '@testing-library/react';
import ProductCard from '../ProductCard';

describe('ProductCard', () => {
  it('renders product title, description, price, brand, and image', () => {
    const product = {
      title: 'Test Product',
      description: 'This is a test product',
      price: 49.99,
      brand: 'TestBrand',
      thumbnail: 'https://example.com/image.jpg',
    };

    render(<ProductCard product={product} />);


    expect(screen.getByRole('heading', { name: /test product/i })).toBeInTheDocument();
    expect(screen.getByText(/this is a test product/i)).toBeInTheDocument();
    expect(screen.getByText(/price: \$49.99/i)).toBeInTheDocument();
    expect(screen.getByText(/brand[:\s]*testbrand/i)).toBeInTheDocument();
    expect(screen.getByAltText(/sunset in the mountains/i)).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('does not render brand if brand is missing', () => {
    const product = {
      title: 'Test Product',
      description: 'This is a test product',
      price: 49.99,
      thumbnail: 'https://example.com/image.jpg',

    };

    render(<ProductCard product={product} />);


    const brandElement = screen.queryByText(/brand/i);
    expect(brandElement).toBeNull(); 
  });
});

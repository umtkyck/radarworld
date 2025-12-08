import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

describe('Footer Component', () => {
  it('renders footer with logo', () => {
    render(<Footer />);

    expect(screen.getByText('Radar')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  it('renders product links', () => {
    render(<Footer />);

    expect(screen.getByText('Commercial Radars')).toBeInTheDocument();
    expect(screen.getByText('Industrial Sensors')).toBeInTheDocument();
    expect(screen.getByText('All Products')).toBeInTheDocument();
  });

  it('renders company links', () => {
    render(<Footer />);

    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('info@radarcart.com')).toBeInTheDocument();
  });

  it('renders copyright with current year', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Radar Cart. All rights reserved.`)).toBeInTheDocument();
  });

  it('renders system status indicator', () => {
    render(<Footer />);

    expect(screen.getByText('System Online')).toBeInTheDocument();
  });

  it('has correct email link', () => {
    render(<Footer />);

    const emailLink = screen.getByRole('link', { name: /info@radarcart.com/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:info@radarcart.com');
  });

  it('has correct phone link', () => {
    render(<Footer />);

    const phoneLink = screen.getByRole('link', { name: /\+1 \(234\) 567-890/i });
    expect(phoneLink).toHaveAttribute('href', 'tel:+1234567890');
  });

  it('has correct product category links', () => {
    render(<Footer />);

    const commercialLink = screen.getByRole('link', { name: /commercial radars/i });
    const industrialLink = screen.getByRole('link', { name: /industrial sensors/i });

    expect(commercialLink).toHaveAttribute('href', '/shop?category=commercial');
    expect(industrialLink).toHaveAttribute('href', '/shop?category=industrial');
  });
});

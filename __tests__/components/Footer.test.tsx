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

    expect(screen.getByText('Traffic Radar')).toBeInTheDocument();
    expect(screen.getByText('Automotive ADAS')).toBeInTheDocument();
    expect(screen.getByText('Water Level Sensors')).toBeInTheDocument();
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

  it('has correct product category links', () => {
    render(<Footer />);

    const trafficLink = screen.getByRole('link', { name: /traffic radar/i });
    const automotiveLink = screen.getByRole('link', { name: /automotive adas/i });
    const waterLevelLink = screen.getByRole('link', { name: /water level sensors/i });

    expect(trafficLink).toHaveAttribute('href', '/shop?category=traffic');
    expect(automotiveLink).toHaveAttribute('href', '/shop?category=automotive');
    expect(waterLevelLink).toHaveAttribute('href', '/shop?category=water-level');
  });
});

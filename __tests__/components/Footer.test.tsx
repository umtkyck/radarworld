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

    expect(screen.getByText('Ground Speed Sensor')).toBeInTheDocument();
    expect(screen.getByText('Sports Tracking Radar')).toBeInTheDocument();
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

    const groundSpeedLink = screen.getByRole('link', { name: /ground speed sensor/i });
    const sportsLink = screen.getByRole('link', { name: /sports tracking radar/i });

    expect(groundSpeedLink).toHaveAttribute('href', '/shop?category=ground-speed');
    expect(sportsLink).toHaveAttribute('href', '/shop?category=sports');
  });
});

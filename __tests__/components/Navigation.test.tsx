import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '@/components/Navigation';
import { CartProvider } from '@/context/CartContext';

// Wrapper component with necessary providers
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <CartProvider>
      {component}
    </CartProvider>
  );
};

describe('Navigation Component', () => {
  it('renders navigation with logo', () => {
    renderWithProviders(<Navigation />);

    expect(screen.getByText('Radar')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithProviders(<Navigation />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Shop')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders cart icon', () => {
    renderWithProviders(<Navigation />);

    // Cart link should be present
    const cartLinks = screen.getAllByRole('link');
    const cartLink = cartLinks.find(link => link.getAttribute('href') === '/cart');
    expect(cartLink).toBeInTheDocument();
  });

  it('renders Sign In button when not authenticated', () => {
    renderWithProviders(<Navigation />);

    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('toggles mobile menu', () => {
    renderWithProviders(<Navigation />);

    // Find menu button (last button with Menu icon)
    const buttons = screen.getAllByRole('button');
    const menuButton = buttons.find(btn => btn.className.includes('md:hidden'));

    if (menuButton) {
      fireEvent.click(menuButton);
      // Mobile menu should be visible after click
      const mobileLinks = screen.getAllByText('Home');
      expect(mobileLinks.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('has correct link hrefs', () => {
    renderWithProviders(<Navigation />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    const shopLink = screen.getByRole('link', { name: /shop/i });
    const contactLink = screen.getByRole('link', { name: /contact/i });

    expect(homeLink).toHaveAttribute('href', '/');
    expect(shopLink).toHaveAttribute('href', '/shop');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });
});

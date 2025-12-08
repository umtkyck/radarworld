import { render, screen } from '@testing-library/react';
import Logo from '@/components/Logo';

describe('Logo Component', () => {
  it('renders logo with default props', () => {
    render(<Logo />);

    expect(screen.getByText('Radar')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  it('renders logo without text when showText is false', () => {
    render(<Logo showText={false} />);

    expect(screen.queryByText('Radar')).not.toBeInTheDocument();
    expect(screen.queryByText('Cart')).not.toBeInTheDocument();
  });

  it('renders SVG icon', () => {
    render(<Logo />);

    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies correct size classes for sm size', () => {
    const { container } = render(<Logo size="sm" />);

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '28');
    expect(svg).toHaveAttribute('height', '28');
  });

  it('applies correct size classes for lg size', () => {
    const { container } = render(<Logo size="lg" />);

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '40');
    expect(svg).toHaveAttribute('height', '40');
  });

  it('applies custom className', () => {
    const { container } = render(<Logo className="custom-class" />);

    const logoDiv = container.firstChild;
    expect(logoDiv).toHaveClass('custom-class');
  });
});

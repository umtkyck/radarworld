import { render } from '@testing-library/react';
import AnimatedBackground from '@/components/AnimatedBackground';

describe('AnimatedBackground Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<AnimatedBackground />);
    expect(container).toBeInTheDocument();
  });

  it('renders gradient base element', () => {
    const { container } = render(<AnimatedBackground />);

    const gradientBase = container.querySelector('.bg-gradient-to-br');
    expect(gradientBase).toBeInTheDocument();
  });

  it('renders animated gradient orbs', () => {
    const { container } = render(<AnimatedBackground />);

    const orbs = container.querySelectorAll('.animate-pulse-glow');
    expect(orbs.length).toBeGreaterThan(0);
  });

  it('renders floating particles', () => {
    const { container } = render(<AnimatedBackground />);

    const floatingParticles = container.querySelectorAll('.animate-float, .animate-float-slow');
    expect(floatingParticles.length).toBeGreaterThan(0);
  });

  it('renders shooting lines', () => {
    const { container } = render(<AnimatedBackground />);

    const shootingLines = container.querySelectorAll('.animate-shooting-line');
    expect(shootingLines.length).toBeGreaterThan(0);
  });

  it('renders radar sweep effect', () => {
    const { container } = render(<AnimatedBackground />);

    const radarSweep = container.querySelector('.animate-radar-sweep');
    expect(radarSweep).toBeInTheDocument();
  });

  it('renders vertical scan line', () => {
    const { container } = render(<AnimatedBackground />);

    const scanLine = container.querySelector('.animate-scan-vertical');
    expect(scanLine).toBeInTheDocument();
  });

  it('renders pulsing rings with ping animation', () => {
    const { container } = render(<AnimatedBackground />);

    const pingingElements = container.querySelectorAll('.animate-ping');
    expect(pingingElements.length).toBeGreaterThan(0);
  });

  it('has pointer-events-none to not block interactions', () => {
    const { container } = render(<AnimatedBackground />);

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('pointer-events-none');
  });

  it('has overflow-hidden to contain animations', () => {
    const { container } = render(<AnimatedBackground />);

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('overflow-hidden');
  });

  it('renders grid pattern overlay', () => {
    const { container } = render(<AnimatedBackground />);

    // Grid pattern has opacity class
    const gridPattern = container.querySelector('.opacity-\\[0\\.03\\]');
    // If specific selector doesn't work, check for any opacity-based element
    const allDivs = container.querySelectorAll('div');
    const hasGridPattern = Array.from(allDivs).some(div =>
      div.style.backgroundImage?.includes('linear-gradient')
    );
    expect(hasGridPattern || gridPattern).toBeTruthy();
  });
});

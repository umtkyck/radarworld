"use client";

import { useRef, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import 3D scene (client-side only)
const Scene = dynamic(() => import('./3d/Scene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900" />
  ),
});

// Stats data with stable IDs
const HERO_STATS = [
  { id: 'stat-products', value: '16+', label: 'Products' },
  { id: 'stat-customers', value: '200+', label: 'Customers' },
  { id: 'stat-countries', value: '10+', label: 'Countries' },
];

const HeroModern = memo(function HeroModern() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900"
    >
      {/* 3D Background with Radar Scanner */}
      <motion.div
        style={{ opacity, scale }}
        className="absolute inset-0 z-0"
      >
        <Scene />
      </motion.div>

      {/* Dither overlay */}
      <div className="absolute inset-0 z-10 opacity-20 mix-blend-overlay pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="dither">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              result="noise"
            />
            <feComponentTransfer in="noise" result="threshold">
              <feFuncA type="discrete" tableValues="0 1" />
            </feComponentTransfer>
          </filter>
          <rect width="100%" height="100%" filter="url(#dither)" opacity="0.4" />
        </svg>
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent z-20 pointer-events-none" />

      {/* Scanline effect */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent scanline" />
      </div>

      {/* Content */}
      <motion.div
        style={{ y }}
        className="relative z-30 h-full flex items-center justify-center px-4"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-flow">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF41] pulse-green"></span>
              </span>
              <span className="text-[#00F0FF] text-sm font-medium font-tech bracket-icon">
                ONLINE
              </span>
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="block text-white">
              Next-Generation
            </span>
            <span className="block bg-gradient-to-r from-[#00F0FF] to-[#00FF41] text-transparent bg-clip-text text-glitch">
              Radar Systems
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-[#8B9DC3] mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Commercial & Industrial radar solutions powered by{' '}
            <span className="font-tech text-[#00F0FF]">77GHz</span>,{' '}
            <span className="font-tech text-[#00F0FF]">80GHz</span>, and{' '}
            <span className="font-tech text-[#00F0FF]">120GHz</span> technology.
            Precision detection for the modern world.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-[#00F0FF] rounded-lg font-semibold text-[#0B1021] text-lg overflow-hidden glow-cyan"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="bracket-icon">EXPLORE PRODUCTS</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </motion.button>
            </Link>

            <Link href="#features">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-strong px-8 py-4 rounded-lg font-semibold text-[#00F0FF] text-lg hover:bg-[#00F0FF]/10 border-flow transition-all"
              >
                <span className="bracket-icon">LEARN MORE</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {HERO_STATS.map((stat) => (
              <div key={stat.id} className="text-center glass rounded-lg p-4">
                <div className="text-4xl font-bold font-tech text-radar-cyan mb-2">
                  <span className="bracket-icon">{stat.value}</span>
                </div>
                <div className="text-radar-muted text-sm uppercase tracking-wider font-tech">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-[#00F0FF]"
        >
          <span className="text-sm uppercase tracking-wider font-tech bracket-icon">SCROLL</span>
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
});

export default HeroModern;

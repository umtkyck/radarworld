"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    icon: '🎯',
    title: 'PRECISION DETECTION',
    description: 'Advanced signal processing algorithms for accurate object detection and tracking in challenging environments.',
    spec: '±2mm accuracy',
  },
  {
    icon: '⚡',
    title: 'REAL-TIME PROCESSING',
    description: 'High-speed data processing with minimal latency for time-critical applications and instant decision-making.',
    spec: '<10ms latency',
  },
  {
    icon: '🛡️',
    title: 'INDUSTRIAL GRADE',
    description: 'Ruggedized systems designed for harsh industrial environments with proven reliability and durability.',
    spec: 'IP68 rated',
  },
];

export default function FeaturesModern() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="features"
      className="relative py-32 bg-[#0B1021] overflow-hidden"
    >
      {/* HUD Grid background */}
      <div className="absolute inset-0 hud-grid opacity-30" />

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-[#00F0FF]/20 to-transparent scanline" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Why Choose</span>{' '}
            <span className="bg-gradient-to-r from-[#00F0FF] to-[#00FF41] text-transparent bg-clip-text">
              RadarWorld?
            </span>
          </h2>
          <p className="text-xl text-[#8B9DC3] max-w-2xl mx-auto font-tech">
            <span className="bracket-icon">Cutting-edge technology meets reliability</span>
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Card background glow */}
              <div className="absolute inset-0 bg-[#00F0FF]/20 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

              {/* Card content with glassmorphism */}
              <div className="relative glass-strong rounded-xl p-8 h-full border-flow group-hover:bg-[#0B1021]/80 transition-all duration-300">
                {/* Icon with bracket */}
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300 bracket-icon">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#00F0FF] transition-colors font-tech">
                  <span className="bracket-icon">{feature.title}</span>
                </h3>

                {/* Technical Spec */}
                <div className="mb-4 px-3 py-1 inline-block rounded-md bg-[#00FF41]/10 border border-[#00FF41]/30">
                  <span className="text-[#00FF41] text-sm font-tech">
                    {feature.spec}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[#8B9DC3] leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative corner brackets */}
                <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-[#00F0FF]/30 group-hover:border-[#00F0FF] transition-colors" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-[#00F0FF]/30 group-hover:border-[#00F0FF] transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative glowing elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-[#00F0FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-[#00FF41]/10 rounded-full blur-3xl" />
    </section>
  );
}

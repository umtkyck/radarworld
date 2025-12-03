"use client";

import { motion, useInView } from 'framer-motion';
import { useRef, memo } from 'react';
import { Crosshair, Zap, Shield, type LucideIcon } from 'lucide-react';

interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  spec: string;
}

const features: Feature[] = [
  {
    id: 'feature-precision',
    icon: Crosshair,
    title: 'PRECISION DETECTION',
    description: 'Advanced signal processing algorithms for accurate object detection and tracking in challenging environments.',
    spec: '±2mm accuracy',
  },
  {
    id: 'feature-realtime',
    icon: Zap,
    title: 'REAL-TIME PROCESSING',
    description: 'High-speed data processing with minimal latency for time-critical applications and instant decision-making.',
    spec: '<10ms latency',
  },
  {
    id: 'feature-industrial',
    icon: Shield,
    title: 'INDUSTRIAL GRADE',
    description: 'Ruggedized systems designed for harsh industrial environments with proven reliability and durability.',
    spec: 'IP68 rated',
  },
];

const FeaturesModern = memo(function FeaturesModern() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="features"
      className="relative py-32 bg-radar-dark overflow-hidden"
    >
      {/* HUD Grid background */}
      <div className="absolute inset-0 hud-grid opacity-30" />

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
            <span className="bg-gradient-to-r from-radar-cyan to-radar-green text-transparent bg-clip-text">
              RadarWorld?
            </span>
          </h2>
          <p className="text-xl text-radar-muted max-w-2xl mx-auto">
            Cutting-edge technology meets reliability
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                {/* Card background glow */}
                <div className="absolute inset-0 bg-radar-cyan/20 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                {/* Card content with glassmorphism */}
                <div className="relative glass-strong rounded-xl p-8 h-full group-hover:bg-radar-dark/80 transition-all duration-300">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-radar-cyan/10 border border-radar-cyan/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-radar-cyan/50 transition-all duration-300">
                    <Icon size={32} className="text-radar-cyan" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-radar-cyan transition-colors font-mono">
                    {feature.title}
                  </h3>

                  {/* Technical Spec */}
                  <div className="mb-4 px-3 py-1.5 inline-flex items-center gap-2 rounded-md bg-radar-green/10 border border-radar-green/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-radar-green" />
                    <span className="text-radar-green text-sm font-mono">
                      {feature.spec}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-radar-muted leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative corner brackets */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-radar-cyan/20 group-hover:border-radar-cyan/50 transition-colors" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-radar-cyan/20 group-hover:border-radar-cyan/50 transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Decorative glowing elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-radar-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-radar-green/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
});

export default FeaturesModern;

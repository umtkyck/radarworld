"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    icon: '🎯',
    title: 'Precision Detection',
    description: 'Advanced signal processing algorithms for accurate object detection and tracking in challenging environments.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: '⚡',
    title: 'Real-Time Processing',
    description: 'High-speed data processing with minimal latency for time-critical applications and instant decision-making.',
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    icon: '🛡️',
    title: 'Industrial Grade',
    description: 'Ruggedized systems designed for harsh industrial environments with proven reliability and durability.',
    gradient: 'from-teal-500 to-emerald-500',
  },
];

export default function FeaturesModern() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="features"
      className="relative py-32 bg-slate-950 overflow-hidden"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(96, 165, 250, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(96, 165, 250, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
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
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
              RadarWorld?
            </span>
          </h2>
          <p className="text-xl text-blue-200/60 max-w-2xl mx-auto">
            Cutting-edge technology meets reliability
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
              {/* Card background with gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

              {/* Card content */}
              <div className="relative bg-slate-900 border border-blue-500/20 rounded-2xl p-8 h-full hover:border-blue-400/40 transition-all duration-300 backdrop-blur-sm">
                {/* Icon */}
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-blue-200/60 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative corner */}
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-blue-500/20 rounded-tr-2xl group-hover:border-blue-400/60 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
    </section>
  );
}

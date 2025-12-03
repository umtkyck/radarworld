"use client";

import HeroModern from "@/components/HeroModern";
import FeaturesModern from "@/components/FeaturesModern";
import Link from "next/link";
import { motion } from "framer-motion";

// Define static data with unique IDs for proper React keys
const APPLICATIONS = [
  { id: 'app-industrial', icon: '🏭', title: 'Industrial Automation', desc: 'Process monitoring and control' },
  { id: 'app-maritime', icon: '🚢', title: 'Maritime', desc: 'Navigation and collision avoidance' },
  { id: 'app-construction', icon: '🏗️', title: 'Construction', desc: 'Site monitoring and safety' },
  { id: 'app-security', icon: '🔒', title: 'Security', desc: 'Perimeter protection systems' },
];

const STATS = [
  { id: 'stat-freq', value: '77-120', unit: 'GHz', label: 'Frequency Range' },
  { id: 'stat-acc', value: '±2', unit: 'mm', label: 'Accuracy' },
  { id: 'stat-range', value: '250', unit: 'm', label: 'Max Range' },
  { id: 'stat-ip', value: 'IP68', unit: '', label: 'Protection' },
];

// Reduced particles for better performance (8 instead of 20)
const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  id: `particle-${i}`,
  x: Math.random() * 1200,
  y: Math.random() * 400,
  opacity: Math.random(),
  duration: 4 + Math.random() * 2,
  delay: Math.random() * 3,
}));

export default function HomeModern() {
  return (
    <div className="bg-radar-dark">
      {/* Modern Hero with 3D Radar */}
      <HeroModern />

      {/* Features Section */}
      <FeaturesModern />

      {/* Applications Section */}
      <section className="py-32 bg-[#0B1021] relative overflow-hidden">
        {/* HUD Grid background */}
        <div className="absolute inset-0 hud-grid opacity-20" />

        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-[#00F0FF]/20 to-transparent scanline" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Industry</span>{' '}
              <span className="bg-gradient-to-r from-[#00F0FF] to-[#00FF41] text-transparent bg-clip-text">
                Applications
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {APPLICATIONS.map((app, i) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group relative glass rounded-xl p-8 border-flow hover:bg-radar-dark/80 transition-all duration-300"
              >
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform bracket-icon">
                  {app.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-radar-cyan transition-colors font-tech">
                  <span className="bracket-icon">{app.title.toUpperCase()}</span>
                </h3>
                <p className="text-radar-muted">{app.desc}</p>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-radar-cyan/0 group-hover:bg-radar-cyan/10 rounded-xl transition-all duration-300 -z-10 blur-lg" />

                {/* Corner brackets */}
                <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-radar-cyan/30 group-hover:border-radar-cyan transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-[#0B1021] relative">
        {/* HUD Grid background */}
        <div className="absolute inset-0 hud-grid opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-center glass-strong rounded-xl p-6 border-flow relative"
                >
                  <div className="text-6xl font-bold font-tech bg-gradient-to-r from-radar-cyan to-radar-green text-transparent bg-clip-text mb-2">
                    <span className="bracket-icon">
                      {stat.value}
                      <span className="text-4xl">{stat.unit}</span>
                    </span>
                  </div>
                  <div className="text-radar-muted uppercase tracking-wider text-sm font-tech">
                    {stat.label}
                  </div>

                  {/* Corner brackets */}
                  <div className="absolute top-2 right-2 w-6 h-6 border-t border-r border-radar-cyan/30" />
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-b border-l border-radar-cyan/30" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-[#0B1021] relative overflow-hidden">
        {/* HUD Grid background */}
        <div className="absolute inset-0 hud-grid opacity-30" />

        {/* Optimized animated particles - reduced count */}
        <div className="absolute inset-0">
          {PARTICLES.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-radar-cyan rounded-full"
              initial={{
                x: particle.x,
                y: particle.y,
                opacity: particle.opacity
              }}
              animate={{
                y: [0, -400],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay
              }}
            />
          ))}
        </div>

        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent scanline" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-strong rounded-2xl p-12 max-w-4xl mx-auto border-flow"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              <span className="bracket-icon">Ready to Transform</span> <br />
              <span className="bg-gradient-to-r from-[#00F0FF] to-[#00FF41] text-transparent bg-clip-text text-glitch">
                Your Operations?
              </span>
            </h2>
            <p className="text-xl text-[#8B9DC3] mb-10 max-w-2xl mx-auto font-tech">
              Explore our range of <span className="text-[#00F0FF] font-bold">16+</span> commercial and industrial radar systems
            </p>
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-[#00F0FF] rounded-xl font-bold font-tech text-[#0B1021] text-xl glow-cyan hover:bg-[#00FF41] transition-all"
              >
                <span className="bracket-icon">VIEW ALL PRODUCTS</span>
              </motion.button>
            </Link>

            {/* Decorative corner brackets */}
            <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-[#00F0FF]/50" />
            <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[#00F0FF]/50" />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-[#00F0FF]/50" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-[#00F0FF]/50" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

"use client";

import HeroModern from "@/components/HeroModern";
import FeaturesModern from "@/components/FeaturesModern";
import Link from "next/link";
import { motion } from "framer-motion";
import { Factory, Ship, HardHat, Lock, ArrowRight, type LucideIcon } from "lucide-react";

// Define static data with unique IDs for proper React keys
interface Application {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
}

const APPLICATIONS: Application[] = [
  { id: 'app-industrial', icon: Factory, title: 'Industrial Automation', desc: 'Process monitoring and control' },
  { id: 'app-maritime', icon: Ship, title: 'Maritime', desc: 'Navigation and collision avoidance' },
  { id: 'app-construction', icon: HardHat, title: 'Construction', desc: 'Site monitoring and safety' },
  { id: 'app-security', icon: Lock, title: 'Security', desc: 'Perimeter protection systems' },
];

const STATS = [
  { id: 'stat-freq', value: '77-120', unit: 'GHz', label: 'Frequency Range' },
  { id: 'stat-acc', value: '±2', unit: 'mm', label: 'Accuracy' },
  { id: 'stat-range', value: '250', unit: 'm', label: 'Max Range' },
  { id: 'stat-ip', value: 'IP68', unit: '', label: 'Protection' },
];

export default function HomeModern() {
  return (
    <div className="bg-radar-dark">
      {/* Modern Hero with 3D Radar */}
      <HeroModern />

      {/* Features Section */}
      <FeaturesModern />

      {/* Applications Section */}
      <section className="py-32 bg-radar-dark relative overflow-hidden">
        {/* HUD Grid background */}
        <div className="absolute inset-0 hud-grid opacity-20" />

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
              <span className="bg-gradient-to-r from-radar-cyan to-radar-green text-transparent bg-clip-text">
                Applications
              </span>
            </h2>
            <p className="text-xl text-radar-muted max-w-2xl mx-auto">
              Radar solutions tailored for every sector
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {APPLICATIONS.map((app, i) => {
              const Icon = app.icon;
              return (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative"
                >
                  <div className="glass-strong rounded-xl p-6 h-full transition-all duration-300 group-hover:bg-radar-dark/80">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-radar-cyan/10 border border-radar-cyan/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-radar-cyan/50 transition-all duration-300">
                      <Icon size={28} className="text-radar-cyan" strokeWidth={1.5} />
                    </div>

                    <h3 className="text-lg font-bold mb-2 text-white group-hover:text-radar-cyan transition-colors font-mono">
                      {app.title.toUpperCase()}
                    </h3>
                    <p className="text-radar-muted text-sm">{app.desc}</p>

                    {/* Corner bracket */}
                    <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-radar-cyan/20 group-hover:border-radar-cyan/50 transition-colors" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-radar-darker relative border-y border-radar-cyan/10">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold font-mono bg-gradient-to-r from-radar-cyan to-radar-green text-transparent bg-clip-text mb-2">
                    {stat.value}
                    <span className="text-2xl md:text-3xl">{stat.unit}</span>
                  </div>
                  <div className="text-radar-muted uppercase tracking-wider text-xs font-mono">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-radar-dark relative overflow-hidden">
        {/* HUD Grid background */}
        <div className="absolute inset-0 hud-grid opacity-20" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Ready to Transform{' '}
              <span className="bg-gradient-to-r from-radar-cyan to-radar-green text-transparent bg-clip-text">
                Your Operations?
              </span>
            </h2>
            <p className="text-xl text-radar-muted mb-10 max-w-2xl mx-auto">
              Explore our range of <span className="text-radar-cyan font-semibold">16+</span> commercial and industrial radar systems
            </p>
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-radar-cyan text-radar-dark rounded-xl font-mono font-bold text-lg hover:bg-radar-green transition-colors"
              >
                View All Products
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

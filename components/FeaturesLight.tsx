"use client";

import { Crosshair, Zap, Shield, Cpu, Wifi, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Crosshair,
    title: "Precision Detection",
    description: "Advanced signal processing for accurate object detection",
    spec: "±2mm",
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description: "High-speed data processing with minimal latency",
    spec: "<10ms",
  },
  {
    icon: Shield,
    title: "Industrial Grade",
    description: "Ruggedized systems for harsh environments",
    spec: "IP68",
  },
  {
    icon: Cpu,
    title: "Smart Integration",
    description: "Easy integration with existing systems via standard protocols",
    spec: "API",
  },
  {
    icon: Wifi,
    title: "Long Range",
    description: "Extended detection range for wide area coverage",
    spec: "250m",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Built-in data analytics and reporting capabilities",
    spec: "24/7",
  },
];

export default function FeaturesLight() {
  return (
    <section id="features" className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why RadarWorld?
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Industry-leading technology for precision detection
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-emerald-500/10">
                  <feature.icon className="w-6 h-6 text-emerald-400" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                  {feature.spec}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

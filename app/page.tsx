import HeroLight from "@/components/HeroLight";
import FeaturesLight from "@/components/FeaturesLight";
import Link from "next/link";
import { ArrowRight, Factory, Ship, HardHat, Lock } from "lucide-react";

const applications = [
  { icon: Factory, title: "Industrial", desc: "Process monitoring and control" },
  { icon: Ship, title: "Maritime", desc: "Navigation and collision avoidance" },
  { icon: HardHat, title: "Construction", desc: "Site monitoring and safety" },
  { icon: Lock, title: "Security", desc: "Perimeter protection systems" },
];

export default function Home() {
  return (
    <div className="bg-[#0a0a0a]">
      {/* Hero Section */}
      <HeroLight />

      {/* Features Section */}
      <FeaturesLight />

      {/* Applications Section */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Industry Applications
            </h2>
            <p className="text-zinc-400 text-lg">
              Radar solutions for every sector
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {applications.map((app) => (
              <div
                key={app.title}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-colors text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                  <app.icon className="w-6 h-6 text-emerald-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-white font-semibold mb-2">{app.title}</h3>
                <p className="text-zinc-500 text-sm">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-zinc-400 text-lg mb-10">
              Explore our range of <span className="text-emerald-400">16+</span> commercial and industrial radar systems
            </p>
            <Link href="/shop">
              <button className="group px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-zinc-200 transition-colors inline-flex items-center gap-2">
                View All Products
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

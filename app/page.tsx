import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { products } from "@/data/products";
import RadarField from "@/components/RadarField";
import ProductCard from "@/components/ProductCard";

const groundSpeed = products.find((p) => p.id === "zlytgss01")!;
const sportsRadar = products.find((p) => p.id === "zlyspt01")!;

const heroStats = [
  { value: "24 GHz", label: "K-band Doppler" },
  { value: "0.1 m/s", label: "Minimum speed" },
  { value: "320 km/h", label: "Maximum speed" },
  { value: "OEM", label: "Custom engineering" },
];

const productSections = [
  {
    product: groundSpeed,
    industry: "Rail & Agriculture",
    headline: "True ground speed, no contact, no slip.",
    copy: "Wheel sensors lie when wheels slip. Our Doppler radar reads velocity directly off the ground, so locomotives get reliable wheel-slip protection and odometry, and agricultural machinery doses seed and spray at the true working speed.",
    points: [
      "Locomotive wheel-slip / slide protection",
      "Rail odometry and track maintenance vehicles",
      "Seeding, spraying, and harvesting rate control",
    ],
  },
  {
    product: sportsRadar,
    industry: "Sports Electronics",
    headline: "Ball, club, and bat \u2014 tracked by one module.",
    copy: "A single compact radar that captures golf ball speed, launch, and club head speed through impact \u2014 or pitch velocity, exit velocity, and bat speed on the diamond. Built to integrate into launch monitors, pitching machines, and swing analyzers.",
    points: [
      "Golf launch monitors and simulators",
      "Baseball pitch and exit velocity tracking",
      "SDK and reference designs included",
    ],
  },
];

const engineeringCapabilities = [
  {
    title: "Custom firmware",
    description: "Application-specific detection profiles, filtering, and output logic tuned to your platform.",
  },
  {
    title: "Interfaces & protocols",
    description: "Pulse, CAN, RS-485, UART, SPI \u2014 or your proprietary protocol, implemented on request.",
  },
  {
    title: "Mechanical adaptation",
    description: "Housings, mounting angles, and connectors adapted to rail bogies, tractor chassis, or consumer devices.",
  },
  {
    title: "Antenna design",
    description: "Beam width and pattern tailored to your detection geometry, from narrow rail beams to wide sports fields.",
  },
];

function SectionHeader({ index, title, sub }: { index: string; title: string; sub: string }) {
  return (
    <div className="mb-12 flex items-end justify-between border-t border-white/10 pt-6">
      <div>
        <span className="font-mono text-xs tracking-widest text-emerald-500">{index}</span>
        <h2 className="mt-2 text-2xl font-medium tracking-tight text-white md:text-3xl">{title}</h2>
      </div>
      <p className="hidden text-sm text-zinc-500 md:block">{sub}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-[#050505]">
      {/* Hero */}
      <section className="relative h-[calc(100svh-5rem)] min-h-[560px] overflow-hidden">
        <div className="absolute inset-0">
          <RadarField />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-emerald-500">
            Millimeter wave sensing
          </p>
          <h1 className="max-w-3xl text-5xl font-medium leading-[1.05] tracking-tight text-white md:text-7xl">
            Radar sensors,
            <br />
            <span className="text-zinc-500">engineered for precision.</span>
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-zinc-400">
            True ground speed sensing for rail and agriculture, and ball &amp; swing
            tracking for sports electronics &mdash; with full custom engineering support.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 bg-white px-7 py-3.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
            >
              View products
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-white/15 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-white/40"
            >
              Talk to an engineer
            </Link>
          </div>
        </div>

        {/* Hero stats */}
        <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-[#050505]/70 backdrop-blur-sm">
          <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-white/10 px-6 md:grid-cols-4">
            {heroStats.map((stat) => (
              <div key={stat.label} className="py-5 pl-4 first:pl-0 md:pl-8 md:first:pl-0">
                <div className="font-mono text-lg text-white md:text-xl">{stat.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader index="01" title="Products" sub="Two platforms, built to be adapted" />
        <div className="space-y-20">
          {productSections.map((section, i) => (
            <div
              key={section.product.id}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-500">
                  {section.industry}
                </p>
                <h3 className="mt-4 text-2xl font-medium tracking-tight text-white md:text-3xl">
                  {section.headline}
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-zinc-400">{section.copy}</p>
                <ul className="mt-6 space-y-3">
                  {section.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-zinc-300">
                      <span className="mt-1.5 h-1 w-1 shrink-0 bg-emerald-500" />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/product/${section.product.id}`}
                  className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-400 transition-colors hover:text-white"
                >
                  View {section.product.model} <ArrowUpRight size={14} />
                </Link>
              </div>
              <div className={`border border-white/10 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <ProductCard product={section.product} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Engineering */}
      <section className="mx-auto max-w-6xl px-6 py-24 pt-0">
        <SectionHeader
          index="02"
          title="Custom engineering"
          sub="Both platforms are starting points, not end points"
        />
        <p className="mb-12 max-w-2xl text-sm leading-relaxed text-zinc-400">
          Every deployment is different. We adapt frequency profiles, firmware,
          interfaces, and mechanics to your application &mdash; from locomotive
          bogies to handheld launch monitors &mdash; and support you from
          prototype to serial production.
        </p>
        <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {engineeringCapabilities.map((capability, index) => (
            <div key={capability.title} className="bg-[#050505] p-6">
              <span className="font-mono text-xs text-zinc-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-base font-medium tracking-tight text-white">
                {capability.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                {capability.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-emerald-500">
            Engineering support
          </p>
          <h2 className="max-w-2xl text-3xl font-medium tracking-tight text-white md:text-5xl">
            Need the sensor adapted to your platform?
          </h2>
          <p className="mt-6 max-w-md text-zinc-400">
            Tell us about your application &mdash; our engineers design custom
            variants, firmware, and integrations free of obligation.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-white px-7 py-3.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
            >
              Contact engineering
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 border border-white/15 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-white/40"
            >
              View products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

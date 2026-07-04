import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { products, categoryInfo } from "@/data/products";
import { ProductCategory } from "@/types/product";
import RadarField from "@/components/RadarField";
import ProductCard from "@/components/ProductCard";

const bestSellers = products.filter((p) => p.badge === "bestseller").slice(0, 4);
const newArrivals = products.filter((p) => p.badge === "new").slice(0, 4);

const categories = Object.keys(categoryInfo) as ProductCategory[];

const heroStats = [
  { value: "24\u2013120 GHz", label: "Frequency range" },
  { value: "\u00b11 mm", label: "Accuracy" },
  { value: "IP68", label: "Protection" },
  { value: `${products.length}`, label: "Sensor models" },
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
      <section className="relative h-[calc(100svh-4rem)] min-h-[560px] overflow-hidden">
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
            Professional 24&ndash;120 GHz sensors for traffic, agriculture, security,
            automotive and industrial applications.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 bg-white px-7 py-3.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
            >
              Browse catalog
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

      {/* Best Sellers */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader index="01" title="Best sellers" sub="Our most deployed sensors" />
        <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-400 transition-colors hover:text-white"
          >
            View all products <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Applications */}
      <section className="mx-auto max-w-6xl px-6 py-24 pt-0">
        <SectionHeader index="02" title="Applications" sub="Find the right sensor for your field" />
        <div className="border-t border-white/10">
          {categories.map((category, index) => (
            <Link
              key={category}
              href={`/shop?category=${category}`}
              className="group flex items-center justify-between border-b border-white/10 py-6 transition-colors hover:bg-white/[0.03]"
            >
              <div className="flex items-baseline gap-6">
                <span className="w-8 font-mono text-xs text-zinc-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-medium tracking-tight text-white md:text-xl">
                    {categoryInfo[category].name}
                  </h3>
                  <p className="mt-1 hidden text-sm text-zinc-500 sm:block">
                    {categoryInfo[category].description}
                  </p>
                </div>
              </div>
              <ArrowUpRight
                size={20}
                className="mr-2 shrink-0 text-zinc-600 transition-all group-hover:mr-0 group-hover:text-emerald-500"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="mx-auto max-w-6xl px-6 py-24 pt-0">
        <SectionHeader index="03" title="New arrivals" sub="Latest additions to the catalog" />
        <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-emerald-500">
            Technical support
          </p>
          <h2 className="max-w-2xl text-3xl font-medium tracking-tight text-white md:text-5xl">
            Not sure which sensor fits your application?
          </h2>
          <p className="mt-6 max-w-md text-zinc-400">
            Our engineers help you choose the right frequency, range and interface
            &mdash; free of charge.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-white px-7 py-3.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
            >
              Contact sales
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 border border-white/15 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-white/40"
            >
              Browse catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, Shield, Globe, Headphones, ChevronRight } from "lucide-react";
import { products, categoryInfo } from "@/data/products";
import { fallbackImages } from "@/lib/constants";
import AnimatedBackground from "@/components/AnimatedBackground";
import ProductCard from "@/components/ProductCard";

const bestSellers = products.filter((p) => p.badge === "bestseller").slice(0, 4);
const newArrivals = products.filter((p) => p.badge === "new").slice(0, 4);

const featuredCategories = ["traffic", "agriculture", "water-level", "automotive"] as const;

export default function Home() {
  return (
    <div className="bg-[#0a0a0a]">
      {/* Announcement Banner */}
      <div className="bg-emerald-600 text-white py-2 px-4 text-center text-sm">
        <span className="font-medium">Free Worldwide Shipping</span> on orders over $1,000 |
        <Link href="/shop" className="underline ml-1 hover:text-emerald-200">Shop Now</Link>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <AnimatedBackground />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-zinc-400">Worldwide Shipping Available</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Professional</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Radar Sensors
              </span>
            </h1>

            <p className="text-xl text-zinc-400 mb-8 max-w-2xl">
              Millimeter wave radar sensors for traffic, agriculture, security, automotive,
              and industrial applications. Precision detection from 24GHz to 120GHz.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/shop">
                <button className="group px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-zinc-200 transition-colors flex items-center gap-2">
                  Shop All Products
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/shop?category=traffic">
                <button className="px-8 py-4 bg-white/5 text-white rounded-full font-semibold text-lg border border-white/10 hover:bg-white/10 transition-colors">
                  Traffic Radar
                </button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-emerald-400" />
                <span>2 Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-emerald-400" />
                <span>Free Shipping $1,000+</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={18} className="text-emerald-400" />
                <span>Ships to 150+ Countries</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-white/5 py-8 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Truck className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <h4 className="text-white font-semibold mb-1">Free Shipping</h4>
              <p className="text-zinc-500 text-sm">On orders over $1,000</p>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <h4 className="text-white font-semibold mb-1">2 Year Warranty</h4>
              <p className="text-zinc-500 text-sm">Full manufacturer warranty</p>
            </div>
            <div className="text-center">
              <Globe className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <h4 className="text-white font-semibold mb-1">Worldwide Delivery</h4>
              <p className="text-zinc-500 text-sm">Ships to 150+ countries</p>
            </div>
            <div className="text-center">
              <Headphones className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <h4 className="text-white font-semibold mb-1">Expert Support</h4>
              <p className="text-zinc-500 text-sm">Technical assistance 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Best Sellers</h2>
              <p className="text-zinc-400">Our most popular radar sensors</p>
            </div>
            <Link href="/shop" className="hidden md:flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors">
              View All <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/shop" className="inline-flex items-center gap-2 text-emerald-400">
              View All Products <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Shop by Application</h2>
            <p className="text-zinc-400">Find the right sensor for your industry</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category) => (
              <Link key={category} href={`/shop?category=${category}`}>
                <div className="group relative h-64 rounded-2xl overflow-hidden">
                  <Image
                    src={fallbackImages[category]}
                    alt={categoryInfo[category].name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{categoryInfo[category].name}</h3>
                    <p className="text-zinc-300 text-sm mb-3 line-clamp-2">{categoryInfo[category].description}</p>
                    <span className="inline-flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                      Shop Now <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/shop" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors">
              Browse all {Object.keys(categoryInfo).length} categories <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">New Arrivals</h2>
              <p className="text-zinc-400">The latest additions to our catalog</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Specs Highlight */}
      <section className="py-20 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Professional Grade Equipment
            </h2>
            <p className="text-zinc-400 text-lg mb-12">
              All our radar sensors meet international standards and come with full technical documentation
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-3xl font-bold text-emerald-400 mb-2">24-120</div>
                <div className="text-zinc-500 text-sm">GHz Frequency Range</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-3xl font-bold text-emerald-400 mb-2">±1mm</div>
                <div className="text-zinc-500 text-sm">Measurement Accuracy</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-3xl font-bold text-emerald-400 mb-2">IP68</div>
                <div className="text-zinc-500 text-sm">Protection Rating</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-3xl font-bold text-emerald-400 mb-2">{products.length}</div>
                <div className="text-zinc-500 text-sm">Product Models</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Need Help Choosing?
            </h2>
            <p className="text-zinc-400 text-lg mb-8">
              Our technical team can help you find the right radar sensor for your application
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/shop">
                <button className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-zinc-200 transition-colors">
                  Browse Products
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-4 bg-white/5 text-white rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-colors">
                  Contact Sales
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

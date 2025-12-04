import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, Shield, Globe, Headphones, Star, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import AnimatedBackground from "@/components/AnimatedBackground";

// Featured products (first 4)
const featuredProducts = products.slice(0, 4);

// Best sellers (random selection)
const bestSellers = products.filter(p => p.price < 5000).slice(0, 4);

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
                Radar Equipment
              </span>
            </h1>

            <p className="text-xl text-zinc-400 mb-8 max-w-2xl">
              Industrial-grade radar systems for commercial and industrial applications.
              From 24GHz to 120GHz, we supply precision detection technology worldwide.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/shop">
                <button className="group px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-zinc-200 transition-colors flex items-center gap-2">
                  Shop All Products
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/shop?category=industrial">
                <button className="px-8 py-4 bg-white/5 text-white rounded-full font-semibold text-lg border border-white/10 hover:bg-white/10 transition-colors">
                  Industrial Sensors
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

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Featured Products</h2>
              <p className="text-zinc-400">Our most popular radar systems</p>
            </div>
            <Link href="/shop" className="hidden md:flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors">
              View All <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="group bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all">
                  <div className="h-48 bg-zinc-900 overflow-hidden relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.inStock && (
                      <div className="absolute top-3 left-3 bg-emerald-500 text-black text-xs font-bold px-2 py-1 rounded">
                        IN STOCK
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-emerald-400 uppercase">{product.category}</span>
                    <h3 className="text-white font-semibold mt-1 mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-white">${product.price.toLocaleString()}</span>
                      <span className="text-xs text-zinc-500">{product.specifications.frequency}</span>
                    </div>
                  </div>
                </div>
              </Link>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">Shop by Category</h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Link href="/shop?category=commercial">
              <div className="group relative h-64 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop"
                  alt="Commercial Radar"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Commercial Radar</h3>
                  <p className="text-zinc-300 mb-4">Maritime, traffic, and weather systems</p>
                  <span className="inline-flex items-center gap-2 text-emerald-400 font-semibold">
                    Shop Now <ArrowRight size={18} />
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/shop?category=industrial">
              <div className="group relative h-64 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop"
                  alt="Industrial Sensors"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Industrial Sensors</h3>
                  <p className="text-zinc-300 mb-4">Level sensors, flow meters, and more</p>
                  <span className="inline-flex items-center gap-2 text-emerald-400 font-semibold">
                    Shop Now <ArrowRight size={18} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Best Sellers</h2>
              <p className="text-zinc-400">Top-rated products by our customers</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="group bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all">
                  <div className="h-48 bg-zinc-900 overflow-hidden relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
                      <Star size={12} fill="currentColor" /> BEST SELLER
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-emerald-400 uppercase">{product.category}</span>
                    <h3 className="text-white font-semibold mt-1 mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-white">${product.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Real World Applications */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Real World Applications
            </h2>
            <p className="text-zinc-400 text-lg">
              See how our radar technology is used across industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Agriculture */}
            <div className="group relative h-80 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=800&fit=crop"
                alt="Agriculture - Tractor with radar sensor"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-emerald-400 text-sm font-medium">Agriculture</span>
                <h3 className="text-xl font-bold text-white mt-1">Smart Farming</h3>
                <p className="text-zinc-300 text-sm mt-2">
                  Level sensors for grain silos and irrigation systems
                </p>
              </div>
            </div>

            {/* Railway */}
            <div className="group relative h-80 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&h=800&fit=crop"
                alt="Railway - Train speed detection"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-emerald-400 text-sm font-medium">Railway</span>
                <h3 className="text-xl font-bold text-white mt-1">Train Detection</h3>
                <p className="text-zinc-300 text-sm mt-2">
                  Speed monitoring and collision prevention systems
                </p>
              </div>
            </div>

            {/* Traffic */}
            <div className="group relative h-80 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=800&fit=crop"
                alt="Traffic monitoring radar"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-emerald-400 text-sm font-medium">Traffic</span>
                <h3 className="text-xl font-bold text-white mt-1">Traffic Monitoring</h3>
                <p className="text-zinc-300 text-sm mt-2">
                  Vehicle speed detection and flow analysis
                </p>
              </div>
            </div>

            {/* Sports */}
            <div className="group relative h-80 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&h=800&fit=crop"
                alt="Golf launch monitor"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-emerald-400 text-sm font-medium">Sports</span>
                <h3 className="text-xl font-bold text-white mt-1">Launch Monitors</h3>
                <p className="text-zinc-300 text-sm mt-2">
                  Ball tracking and swing analysis for golf
                </p>
              </div>
            </div>
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
              All our radar systems meet international standards and come with full technical documentation
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-3xl font-bold text-emerald-400 mb-2">24-120</div>
                <div className="text-zinc-500 text-sm">GHz Frequency Range</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-3xl font-bold text-emerald-400 mb-2">±2mm</div>
                <div className="text-zinc-500 text-sm">Measurement Accuracy</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-3xl font-bold text-emerald-400 mb-2">IP68</div>
                <div className="text-zinc-500 text-sm">Protection Rating</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-3xl font-bold text-emerald-400 mb-2">16+</div>
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
              Our technical team can help you find the right radar system for your application
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/shop">
                <button className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-zinc-200 transition-colors">
                  Browse Products
                </button>
              </Link>
              <a href="mailto:info@radarcart.com">
                <button className="px-8 py-4 bg-white/5 text-white rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-colors">
                  Contact Sales
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

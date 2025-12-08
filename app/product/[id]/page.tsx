"use client";

import { products, categoryInfo } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, use, useCallback } from "react";
import {
  ShoppingCart,
  Check,
  ChevronLeft,
  Truck,
  Shield,
  Globe,
  Package,
  Minus,
  Plus,
  Tag,
  Cpu,
  Zap,
  Radio,
  Thermometer,
  Ruler,
  Scale,
  Plug,
} from "lucide-react";

const categoryColors: Record<string, string> = {
  traffic: "bg-blue-500/10 text-blue-400",
  agriculture: "bg-green-500/10 text-green-400",
  security: "bg-red-500/10 text-red-400",
  automotive: "bg-purple-500/10 text-purple-400",
  "water-level": "bg-cyan-500/10 text-cyan-400",
  uav: "bg-orange-500/10 text-orange-400",
  industrial: "bg-emerald-500/10 text-emerald-400",
};

const fallbackImages: Record<string, string> = {
  traffic: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&q=80",
  agriculture: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop&q=80",
  security: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80",
  automotive: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop&q=80",
  "water-level": "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop&q=80",
  uav: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=600&fit=crop&q=80",
  industrial: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop&q=80",
};

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const { addToCartMultiple } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!product) {
    notFound();
  }

  const handleAddToCart = useCallback(() => {
    addToCartMultiple(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }, [product, quantity, addToCartMultiple]);

  // Related products (same category, different product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const imageSrc = imageError
    ? fallbackImages[product.category] || fallbackImages.industrial
    : product.image.startsWith("/")
    ? fallbackImages[product.category] || fallbackImages.industrial
    : product.image;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Breadcrumb */}
      <div className="border-b border-white/5">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-zinc-500 hover:text-white transition-colors">Home</Link>
            <span className="text-zinc-600">/</span>
            <Link href="/shop" className="text-zinc-500 hover:text-white transition-colors">Shop</Link>
            <span className="text-zinc-600">/</span>
            <Link
              href={`/shop?category=${product.category}`}
              className="text-zinc-500 hover:text-white transition-colors capitalize"
            >
              {categoryInfo[product.category]?.name || product.category}
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400 truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Link href="/shop" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8">
          <ChevronLeft size={20} />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-zinc-900 rounded-2xl overflow-hidden relative">
              <Image
                src={imageSrc}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
                quality={90}
                onError={() => setImageError(true)}
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                    product.badge === "bestseller"
                      ? "bg-emerald-500 text-black"
                      : product.badge === "new"
                      ? "bg-blue-500 text-white"
                      : "bg-red-500 text-white"
                  }`}>
                    {product.badge === "bestseller" ? "BEST SELLER" : product.badge.toUpperCase()}
                  </span>
                )}
                {discount > 0 && (
                  <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                    -{discount}% OFF
                  </span>
                )}
              </div>
              {product.inStock && (
                <div className="absolute top-4 right-4 bg-emerald-500 text-black text-sm font-bold px-3 py-1 rounded-full">
                  IN STOCK
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div>
            {/* Category & Model */}
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                categoryColors[product.category] || categoryColors.industrial
              }`}>
                {categoryInfo[product.category]?.name || product.category}
              </span>
              {product.model && (
                <span className="text-zinc-500 text-sm font-mono">
                  Model: {product.model}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{product.name}</h1>
            <p className="text-zinc-400 mb-6 text-lg leading-relaxed">{product.description}</p>

            {/* Price */}
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-zinc-500 line-through ml-3">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-zinc-500 ml-2">USD</span>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mb-8 text-sm">
              <div className="flex items-center gap-2 text-zinc-400">
                <Truck size={18} className="text-emerald-400" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Shield size={18} className="text-emerald-400" />
                <span>2 Year Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Globe size={18} className="text-emerald-400" />
                <span>Ships Worldwide</span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4 items-center mb-8">
              <div className="flex items-center bg-white/5 rounded-xl border border-white/10">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-white/5 transition-colors text-zinc-400 hover:text-white"
                >
                  <Minus size={20} />
                </button>
                <span className="px-6 py-3 text-white font-semibold min-w-[60px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-white/5 transition-colors text-zinc-400 hover:text-white"
                >
                  <Plus size={20} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  !product.inStock
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                    : added
                    ? "bg-emerald-500 text-black"
                    : "bg-white text-black hover:bg-zinc-200"
                }`}
              >
                {!product.inStock ? (
                  "Out of Stock"
                ) : added ? (
                  <>
                    <Check size={20} />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Add to Cart
                  </>
                )}
              </button>
            </div>

            {/* Applications */}
            {product.applications && product.applications.length > 0 && (
              <div className="mb-8 p-6 bg-white/[0.02] rounded-2xl border border-white/5">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Tag size={20} className="text-emerald-400" />
                  Applications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app, index) => (
                    <span
                      key={index}
                      className="bg-white/5 text-zinc-300 text-sm px-3 py-1.5 rounded-full"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            <div className="mb-8 p-6 bg-white/[0.02] rounded-2xl border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Package size={20} className="text-emerald-400" />
                Key Features
              </h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-white/[0.02] rounded-xl flex items-start gap-3">
                  <Radio size={18} className="text-emerald-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Frequency</p>
                    <p className="text-white font-medium text-sm">{product.specifications.frequency}</p>
                  </div>
                </div>
                <div className="p-4 bg-white/[0.02] rounded-xl flex items-start gap-3">
                  <Ruler size={18} className="text-emerald-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Range</p>
                    <p className="text-white font-medium text-sm">{product.specifications.range}</p>
                  </div>
                </div>
                {product.specifications.accuracy && (
                  <div className="p-4 bg-white/[0.02] rounded-xl flex items-start gap-3">
                    <Cpu size={18} className="text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Accuracy</p>
                      <p className="text-white font-medium text-sm">{product.specifications.accuracy}</p>
                    </div>
                  </div>
                )}
                <div className="p-4 bg-white/[0.02] rounded-xl flex items-start gap-3">
                  <Zap size={18} className="text-emerald-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Power</p>
                    <p className="text-white font-medium text-sm">{product.specifications.power}</p>
                  </div>
                </div>
                {product.specifications.interface && (
                  <div className="p-4 bg-white/[0.02] rounded-xl flex items-start gap-3">
                    <Plug size={18} className="text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Interface</p>
                      <p className="text-white font-medium text-sm">{product.specifications.interface}</p>
                    </div>
                  </div>
                )}
                {product.specifications.protection && (
                  <div className="p-4 bg-white/[0.02] rounded-xl flex items-start gap-3">
                    <Shield size={18} className="text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Protection</p>
                      <p className="text-white font-medium text-sm">{product.specifications.protection}</p>
                    </div>
                  </div>
                )}
                {product.specifications.temperature && (
                  <div className="p-4 bg-white/[0.02] rounded-xl flex items-start gap-3">
                    <Thermometer size={18} className="text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Temperature</p>
                      <p className="text-white font-medium text-sm">{product.specifications.temperature}</p>
                    </div>
                  </div>
                )}
                {product.specifications.weight && (
                  <div className="p-4 bg-white/[0.02] rounded-xl flex items-start gap-3">
                    <Scale size={18} className="text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Weight</p>
                      <p className="text-white font-medium text-sm">{product.specifications.weight}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-white mb-8">Related Products</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => {
                const relatedImageSrc = relatedProduct.image.startsWith("/")
                  ? fallbackImages[relatedProduct.category] || fallbackImages.industrial
                  : relatedProduct.image;

                return (
                  <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                    <div className="group bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all">
                      <div className="h-48 bg-zinc-900 overflow-hidden relative">
                        <Image
                          src={relatedImageSrc}
                          alt={relatedProduct.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                          {relatedProduct.name}
                        </h3>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-white">${relatedProduct.price.toLocaleString()}</span>
                          {relatedProduct.originalPrice && (
                            <span className="text-sm text-zinc-500 line-through">
                              ${relatedProduct.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

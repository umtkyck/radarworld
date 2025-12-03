"use client";

import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, use, useCallback } from "react";
import { ShoppingCart, Check, ChevronLeft, Truck, Shield, Globe, Package, Minus, Plus } from "lucide-react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const { addToCartMultiple } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

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
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
                quality={90}
              />
              {product.inStock && (
                <div className="absolute top-4 left-4 bg-emerald-500 text-black text-sm font-bold px-3 py-1 rounded-full">
                  IN STOCK
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                product.category === "commercial"
                  ? "bg-cyan-500/10 text-cyan-400"
                  : "bg-emerald-500/10 text-emerald-400"
              }`}>
                {product.category.toUpperCase()}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{product.name}</h1>
            <p className="text-zinc-400 mb-6 text-lg leading-relaxed">{product.description}</p>

            <div className="mb-8">
              <span className="text-4xl font-bold text-white">
                ${product.price.toLocaleString()}
              </span>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/[0.02] rounded-xl">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Range</p>
                  <p className="text-white font-semibold">{product.specifications.range}</p>
                </div>
                <div className="p-4 bg-white/[0.02] rounded-xl">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Frequency</p>
                  <p className="text-white font-semibold">{product.specifications.frequency}</p>
                </div>
                <div className="p-4 bg-white/[0.02] rounded-xl">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Power</p>
                  <p className="text-white font-semibold">{product.specifications.power}</p>
                </div>
                <div className="p-4 bg-white/[0.02] rounded-xl">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Resolution</p>
                  <p className="text-white font-semibold">{product.specifications.resolution}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-white mb-8">Related Products</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                  <div className="group bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all">
                    <div className="h-48 bg-zinc-900 overflow-hidden relative">
                      <Image
                        src={relatedProduct.image}
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
                      <span className="text-xl font-bold text-white">${relatedProduct.price.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

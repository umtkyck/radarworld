"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Trash2, Minus, Plus, ArrowRight, Truck, Shield, ChevronLeft } from "lucide-react";
import { categoryColors } from "@/lib/constants";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  const shipping = total >= 1000 ? 0 : 99;
  const finalTotal = total + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-zinc-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
          <p className="text-zinc-400 mb-8">
            Looks like you haven't added any radar systems to your cart yet.
          </p>
          <Link href="/shop">
            <button className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-zinc-200 transition-colors inline-flex items-center gap-2">
              Browse Products
              <ArrowRight size={20} />
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-white/5">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-zinc-500 hover:text-white transition-colors">Home</Link>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400">Cart</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Link href="/shop" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8">
          <ChevronLeft size={20} />
          Continue Shopping
        </Link>

        <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart ({items.length})</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                <div className="flex gap-6">
                  <Link href={`/product/${item.id}`} className="w-32 h-32 bg-zinc-900 rounded-xl overflow-hidden flex-shrink-0 relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="128px"
                      className="object-cover hover:scale-105 transition-transform"
                      loading="lazy"
                      quality={75}
                    />
                  </Link>

                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <div className="min-w-0">
                        <Link href={`/product/${item.id}`}>
                          <h3 className="text-lg font-semibold text-white hover:text-emerald-400 transition-colors truncate">
                            {item.name}
                          </h3>
                        </Link>
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mt-1 capitalize ${
                          categoryColors[item.category] || categoryColors.industrial
                        }`}>
                          {item.category.replaceAll("-", " ")}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <p className="text-zinc-500 text-sm mb-4 line-clamp-1">{item.shortDescription}</p>

                    <div className="flex flex-wrap justify-between items-center gap-4">
                      <div className="flex items-center bg-white/5 rounded-lg border border-white/10">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-white/5 transition-colors text-zinc-400 hover:text-white"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2 text-white font-semibold min-w-[50px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-white/5 transition-colors text-zinc-400 hover:text-white"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-zinc-500">
                          ${item.price.toLocaleString()} × {item.quantity}
                        </p>
                        <p className="text-xl font-bold text-white">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-white">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-emerald-400">FREE</span>
                  ) : (
                    <span className="text-white">${shipping}</span>
                  )}
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-zinc-500">
                    Add ${(1000 - total).toLocaleString()} more for free shipping
                  </p>
                )}
                <div className="border-t border-white/10 pt-4 flex justify-between">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <span className="text-2xl font-bold text-white">${finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <Link href="/checkout">
                <button className="w-full py-4 bg-white text-black rounded-xl font-semibold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 mb-4">
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </button>
              </Link>

              {/* Trust badges */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <Truck size={18} className="text-emerald-400" />
                  <span>Free shipping on orders over $1,000</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <Shield size={18} className="text-emerald-400" />
                  <span>Secure checkout with Stripe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

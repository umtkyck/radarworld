"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Trash2, Minus, Plus, ArrowRight, Truck, Shield, ChevronLeft } from "lucide-react";
import { getProductImageSrc } from "@/lib/constants";
import { FREE_SHIPPING_THRESHOLD, cheapestRate } from "@/lib/shipping";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  const freeShipping = total >= FREE_SHIPPING_THRESHOLD;

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
            <ShoppingBag size={40} className="text-slate-400" />
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">Your Cart is Empty</h1>
          <p className="mb-8 text-slate-500">
            Looks like you haven&apos;t added any radar systems to your cart yet.
          </p>
          <Link href="/shop">
            <button className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-8 py-4 font-medium text-white transition-colors hover:bg-slate-800">
              Browse Products
              <ArrowRight size={20} />
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-slate-400 transition-colors hover:text-slate-900">Home</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600">Cart</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Link href="/shop" className="mb-8 inline-flex items-center gap-2 text-slate-500 transition-colors hover:text-slate-900">
          <ChevronLeft size={20} />
          Continue Shopping
        </Link>

        <h1 className="mb-8 text-3xl font-bold tracking-tight text-slate-900">Shopping Cart ({items.length})</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex gap-6">
                  <Link href={`/product/${item.id}`} className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    <Image
                      src={getProductImageSrc(item.image, item.category, false)}
                      alt={item.name}
                      fill
                      sizes="128px"
                      className="object-cover transition-transform hover:scale-105"
                      loading="lazy"
                      quality={75}
                    />
                  </Link>

                  <div className="min-w-0 flex-grow">
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <Link href={`/product/${item.id}`}>
                          <h3 className="truncate text-lg font-semibold text-slate-900 transition-colors hover:text-slate-600">
                            {item.name}
                          </h3>
                        </Link>
                        <span className="mt-1 inline-block text-[11px] font-medium uppercase tracking-wider text-slate-400">
                          {item.category.replaceAll("-", " ")}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <p className="mb-4 line-clamp-1 text-sm text-slate-500">{item.shortDescription}</p>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center rounded-lg border border-slate-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-slate-500 transition-colors hover:text-slate-900"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="min-w-[50px] px-4 py-2 text-center font-semibold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-slate-500 transition-colors hover:text-slate-900"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-slate-400">
                          ${item.price.toLocaleString()} × {item.quantity}
                        </p>
                        <p className="text-xl font-bold tracking-tight text-slate-900">
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
            <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-bold tracking-tight text-slate-900">Order Summary</h2>

              <div className="mb-6 space-y-4">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Shipping</span>
                  {freeShipping ? (
                    <span className="font-medium text-emerald-600">FREE</span>
                  ) : (
                    <span className="font-medium text-slate-900">From ${cheapestRate}</span>
                  )}
                </div>
                <p className="text-xs text-slate-400">
                  {freeShipping
                    ? "Free ground shipping — express options at checkout"
                    : `UPS, FedEx, or USPS — select at checkout. Add $${(FREE_SHIPPING_THRESHOLD - total).toLocaleString()} more for free shipping`}
                </p>
                <div className="flex justify-between border-t border-slate-200 pt-4">
                  <span className="text-lg font-semibold text-slate-900">Total</span>
                  <span className="text-2xl font-bold tracking-tight text-slate-900">
                    ${total.toLocaleString()}
                    {!freeShipping && <span className="text-sm font-normal text-slate-400"> + shipping</span>}
                  </span>
                </div>
              </div>

              <Link href="/checkout">
                <button className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-4 font-semibold text-white transition-colors hover:bg-slate-800">
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </button>
              </Link>

              {/* Trust badges */}
              <div className="space-y-3 border-t border-slate-200 pt-4">
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <Truck size={18} className="text-slate-900" />
                  <span>UPS, FedEx &amp; USPS &mdash; free over $1,000</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <Shield size={18} className="text-slate-900" />
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

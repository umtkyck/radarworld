"use client";

import { useCart } from "@/context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock, CreditCard, ShoppingBag, ArrowRight, ChevronLeft, Truck, Shield } from "lucide-react";
import { getProductImageSrc } from "@/lib/constants";
import { FREE_SHIPPING_THRESHOLD, cheapestRate } from "@/lib/shipping";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export default function CheckoutPage() {
  const { items, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const freeShipping = total >= FREE_SHIPPING_THRESHOLD;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-zinc-600" />
          </div>
          <h1 className="text-3xl font-medium tracking-tight text-white mb-4">No Items to Checkout</h1>
          <p className="text-zinc-400 mb-8">Your cart is empty.</p>
          <Link href="/shop">
            <button className="px-8 py-4 bg-white text-black font-medium hover:bg-zinc-200 transition-colors inline-flex items-center gap-2">
              Browse Products
              <ArrowRight size={20} />
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { sessionId } = await response.json();

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe failed to load");
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw error;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err instanceof Error ? err.message : "An error occurred during checkout");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-zinc-500 hover:text-white transition-colors">Home</Link>
            <span className="text-zinc-600">/</span>
            <Link href="/cart" className="text-zinc-500 hover:text-white transition-colors">Cart</Link>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400">Checkout</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Link href="/cart" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8">
          <ChevronLeft size={20} />
          Back to Cart
        </Link>

        <h1 className="text-3xl font-medium tracking-tight text-white mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/[0.02] border border-white/10 p-6">
              <h2 className="text-xl font-medium tracking-tight text-white mb-6">Order Items ({items.length})</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-white/10 last:border-0 last:pb-0">
                    <div className="w-20 h-20 bg-zinc-900 overflow-hidden flex-shrink-0 relative">
                      <Image
                        src={getProductImageSrc(item.image, item.category, false)}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                        loading="lazy"
                        quality={75}
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="font-semibold text-white truncate">{item.name}</h3>
                      <p className="text-sm text-zinc-500">Qty: {item.quantity}</p>
                      <p className="text-lg font-medium tracking-tight text-white mt-1">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white/[0.02] border border-white/10 p-6">
              <h2 className="text-xl font-medium tracking-tight text-white mb-4">Shipping Information</h2>
              <p className="text-zinc-400 mb-4">
                You&apos;ll enter your shipping address and choose your carrier
                &mdash; UPS, FedEx, or USPS &mdash; on the secure Stripe checkout page.
              </p>
              <div className="space-y-2 text-sm text-zinc-400">
                <div className="flex items-center gap-3">
                  <Truck size={18} className="text-emerald-400" />
                  <span>Shipping across the US, Canada, and Mexico</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck size={18} className="text-emerald-400" />
                  <span>Ground, 2-day, and overnight services available</span>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-6">
              <div className="flex items-start gap-4">
                <Lock size={24} className="text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-white mb-2">Secure Payment</h3>
                  <p className="text-sm text-zinc-400">
                    Your payment will be processed securely through Stripe. We never store your card details.
                    You'll be redirected to Stripe's secure checkout page to complete your purchase.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/[0.02] border border-white/10 p-6 sticky top-24">
              <h2 className="text-xl font-medium tracking-tight text-white mb-6">Payment Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-white">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Shipping</span>
                  {freeShipping ? (
                    <span className="text-emerald-400">FREE</span>
                  ) : (
                    <span className="text-zinc-500">From ${cheapestRate} &mdash; select carrier</span>
                  )}
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Tax</span>
                  <span className="text-zinc-500">Calculated at checkout</span>
                </div>
                <div className="border-t border-white/10 pt-4 flex justify-between">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <span className="text-2xl font-medium tracking-tight text-white">
                    ${total.toLocaleString()}
                    {!freeShipping && <span className="text-sm text-zinc-500"> + shipping</span>}
                  </span>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 mb-4">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full py-4 bg-white text-black font-semibold hover:bg-zinc-200 transition-colors disabled:bg-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
              >
                {loading ? (
                  "Processing..."
                ) : (
                  <>
                    <CreditCard size={20} />
                    Proceed to Payment
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-sm text-zinc-500">
                <Lock size={16} />
                <span>Secured by Stripe</span>
              </div>

              {/* Trust badges */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <Shield size={18} className="text-emerald-400" />
                  <span>2 Year Manufacturer Warranty</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <Truck size={18} className="text-emerald-400" />
                  <span>Ships within 2-3 business days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

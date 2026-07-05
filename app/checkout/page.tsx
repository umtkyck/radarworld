"use client";

import { useCart } from "@/context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock, CreditCard, ShoppingBag, ArrowRight, ChevronLeft, Truck, Shield, Landmark, Copy, Check, Mail } from "lucide-react";
import { getProductImageSrc } from "@/lib/constants";
import { FREE_SHIPPING_THRESHOLD, cheapestRate } from "@/lib/shipping";
import { PAYMENT_ENTITY, wireTransferDetails, wireTransferDetailsText } from "@/lib/payment";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

type PaymentMethod = "card" | "wire";

export default function CheckoutPage() {
  const { items, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [copied, setCopied] = useState(false);

  const freeShipping = total >= FREE_SHIPPING_THRESHOLD;

  const handleCopyWireDetails = async () => {
    try {
      await navigator.clipboard.writeText(wireTransferDetailsText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable; user can still select the text manually
    }
  };

  const orderSummaryLines = items
    .map((item) => `${item.quantity}x ${item.model || item.name} - $${(item.price * item.quantity).toLocaleString()}`)
    .join("%0D%0A");
  const wireOrderMailto =
    `mailto:umtkyck@gmail.com?subject=${encodeURIComponent("Bank Transfer Order - Radar Cart")}` +
    `&body=Hello,%0D%0A%0D%0AI would like to place the following order and pay by bank transfer:%0D%0A%0D%0A` +
    `${orderSummaryLines}%0D%0A%0D%0ASubtotal: $${total.toLocaleString()}%0D%0A%0D%0A` +
    `Company:%0D%0AShipping address:%0D%0APhone:%0D%0A`;

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
            <ShoppingBag size={40} className="text-slate-400" />
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">No Items to Checkout</h1>
          <p className="mb-8 text-slate-500">Your cart is empty.</p>
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-slate-400 transition-colors hover:text-slate-900">Home</Link>
            <span className="text-slate-300">/</span>
            <Link href="/cart" className="text-slate-400 transition-colors hover:text-slate-900">Cart</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600">Checkout</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Link href="/cart" className="mb-8 inline-flex items-center gap-2 text-slate-500 transition-colors hover:text-slate-900">
          <ChevronLeft size={20} />
          Back to Cart
        </Link>

        <h1 className="mb-8 text-3xl font-bold tracking-tight text-slate-900">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Order Items */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-bold tracking-tight text-slate-900">Order Items ({items.length})</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
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
                    <div className="min-w-0 flex-grow">
                      <h3 className="truncate font-semibold text-slate-900">{item.name}</h3>
                      <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                      <p className="mt-1 text-lg font-bold tracking-tight text-slate-900">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Info */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold tracking-tight text-slate-900">Shipping Information</h2>
              <p className="mb-4 text-slate-500">
                You&apos;ll enter your shipping address and choose your carrier
                &mdash; UPS, FedEx, or USPS &mdash; on the secure Stripe checkout page.
              </p>
              <div className="space-y-2 text-sm text-slate-500">
                <div className="flex items-center gap-3">
                  <Truck size={18} className="text-slate-900" />
                  <span>Shipping across the US, Canada, and Mexico</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck size={18} className="text-slate-900" />
                  <span>Ground, 2-day, and overnight services available</span>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-start gap-4">
                <Lock size={24} className="mt-1 flex-shrink-0 text-slate-900" />
                <div>
                  <h3 className="mb-2 font-semibold text-slate-900">Secure Payment</h3>
                  <p className="text-sm text-slate-500">
                    Card payments are processed securely through Stripe &mdash; we never
                    store your card details. Prefer to pay by bank? Select Bank
                    Transfer to pay {PAYMENT_ENTITY} by ACH or wire.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-bold tracking-tight text-slate-900">Payment Summary</h2>

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
                    <span className="text-slate-400">From ${cheapestRate} &mdash; select carrier</span>
                  )}
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Tax</span>
                  <span className="text-slate-400">Calculated at checkout</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-4">
                  <span className="text-lg font-semibold text-slate-900">Total</span>
                  <span className="text-2xl font-bold tracking-tight text-slate-900">
                    ${total.toLocaleString()}
                    {!freeShipping && <span className="text-sm font-normal text-slate-400"> + shipping</span>}
                  </span>
                </div>
              </div>

              {/* Payment method */}
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-semibold text-slate-900">Payment Method</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`flex flex-col items-center gap-1.5 rounded-lg border px-3 py-3 text-sm font-medium transition-colors ${
                      paymentMethod === "card"
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 text-slate-600 hover:border-slate-400"
                    }`}
                  >
                    <CreditCard size={18} />
                    Card
                  </button>
                  <button
                    onClick={() => setPaymentMethod("wire")}
                    className={`flex flex-col items-center gap-1.5 rounded-lg border px-3 py-3 text-sm font-medium transition-colors ${
                      paymentMethod === "wire"
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 text-slate-600 hover:border-slate-400"
                    }`}
                  >
                    <Landmark size={18} />
                    Bank Transfer
                  </button>
                </div>
              </div>

              {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {paymentMethod === "card" ? (
                <>
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-4 font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
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

                  <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                    <Lock size={16} />
                    <span>Secured by Stripe</span>
                  </div>
                </>
              ) : (
                <div>
                  <p className="mb-4 text-sm text-slate-500">
                    Pay by ACH or wire transfer (domestic and international).
                    Remit payment to:
                  </p>
                  <dl className="mb-4 overflow-hidden rounded-lg border border-slate-200 text-sm">
                    {wireTransferDetails.map((row) => (
                      <div key={row.label} className="border-b border-slate-100 px-3 py-2 last:border-b-0 odd:bg-slate-50">
                        <dt className="text-xs text-slate-400">{row.label}</dt>
                        <dd className="break-words font-medium text-slate-900">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <button
                    onClick={handleCopyWireDetails}
                    className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
                  >
                    {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                    {copied ? "Copied" : "Copy bank details"}
                  </button>
                  <a
                    href={wireOrderMailto}
                    className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-4 font-semibold text-white transition-colors hover:bg-slate-800"
                  >
                    <Mail size={18} />
                    Email Order for Invoice
                  </a>
                  <p className="text-xs text-slate-400">
                    Send us your order and shipping details &mdash; we&apos;ll reply
                    with a pro forma invoice and reference number. Orders ship
                    once the transfer clears.
                  </p>
                </div>
              )}

              {/* Trust badges */}
              <div className="mt-6 space-y-3 border-t border-slate-200 pt-6">
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <Shield size={18} className="text-slate-900" />
                  <span>2 Year Manufacturer Warranty</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <Truck size={18} className="text-slate-900" />
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

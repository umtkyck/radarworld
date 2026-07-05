"use client";

import { useEffect, useState, Suspense } from "react";
import { useCart } from "@/context/CartContext";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CheckCircle, ArrowRight, Package, Mail, Loader2 } from "lucide-react";
import { createOrder } from "@/lib/firestore";

function SuccessContent() {
  const { items, clearCart, total } = useCart();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { data: session } = useSession();
  const [orderSaved, setOrderSaved] = useState(false);
  const [saving, setSaving] = useState(true);

  useEffect(() => {
    const saveOrder = async () => {
      if (!sessionId || orderSaved || items.length === 0) {
        setSaving(false);
        return;
      }

      try {
        // Pull the real amounts (including the carrier chosen at Stripe
        // checkout) from the session; fall back to a local estimate.
        let subtotal = total;
        let shipping = 0;
        let orderTotal = total;
        try {
          const res = await fetch(`/api/checkout/session?session_id=${sessionId}`);
          if (res.ok) {
            const data = await res.json();
            subtotal = data.subtotal ?? total;
            shipping = data.shipping ?? 0;
            orderTotal = data.total ?? subtotal + shipping;
          }
        } catch {
          // Keep local fallback values
        }

        await createOrder({
          userId: session?.user?.id,
          userEmail: session?.user?.email || undefined,
          items: items.map(item => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          subtotal,
          shipping,
          total: orderTotal,
          status: "pending",
          stripeSessionId: sessionId,
        });

        setOrderSaved(true);
        clearCart();
      } catch (error) {
        console.error("Error saving order:", error);
      } finally {
        setSaving(false);
      }
    };

    saveOrder();
  }, [sessionId, items, total, session, clearCart, orderSaved]);

  if (saving) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 size={48} className="mx-auto mb-4 animate-spin text-slate-900" />
          <p className="text-slate-500">Processing your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-lg text-center">
        {/* Success Icon */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle size={48} className="text-emerald-600" />
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">Payment Successful!</h1>
        <p className="mb-8 text-lg text-slate-500">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        {/* What's Next */}
        <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm">
          <h2 className="mb-4 font-semibold text-slate-900">What happens next?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100">
                <Mail size={16} className="text-slate-900" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Confirmation Email</p>
                <p className="text-sm text-slate-500">You&apos;ll receive an order confirmation email shortly</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100">
                <Package size={16} className="text-slate-900" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Processing &amp; Shipping</p>
                <p className="text-sm text-slate-500">Your order will be processed within 2-3 business days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Reference */}
        {sessionId && (
          <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-400">Order Reference</p>
            <p className="truncate text-sm font-medium text-slate-900">{sessionId}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-8 py-4 font-medium text-white transition-colors hover:bg-slate-800"
          >
            Continue Shopping
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-slate-200 px-8 py-4 font-medium text-slate-900 transition-colors hover:bg-slate-50"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        <Loader2 size={48} className="mx-auto mb-4 animate-spin text-slate-900" />
        <p className="text-slate-500">Loading...</p>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SuccessContent />
    </Suspense>
  );
}

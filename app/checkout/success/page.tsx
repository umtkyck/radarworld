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
        const shipping = total >= 1000 ? 0 : 99;

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
          subtotal: total,
          shipping,
          total: total + shipping,
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
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="text-emerald-400 animate-spin mx-auto mb-4" />
          <p className="text-zinc-400">Processing your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={48} className="text-emerald-400" />
        </div>

        <h1 className="text-4xl font-medium tracking-tight text-white mb-4">Payment Successful!</h1>
        <p className="text-zinc-400 text-lg mb-8">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        {/* What's Next */}
        <div className="bg-white/[0.02] border border-white/10 p-6 mb-8 text-left">
          <h2 className="font-semibold text-white mb-4">What happens next?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <Mail size={16} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Confirmation Email</p>
                <p className="text-zinc-500 text-sm">You'll receive an order confirmation email shortly</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <Package size={16} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Processing & Shipping</p>
                <p className="text-zinc-500 text-sm">Your order will be processed within 2-3 business days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Reference */}
        {sessionId && (
          <div className="bg-white/[0.02] border border-white/10 p-4 mb-8">
            <p className="text-zinc-500 text-sm">Order Reference</p>
            <p className="text-white font-mono text-sm truncate">{sessionId}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="px-8 py-4 bg-white text-black font-medium hover:bg-zinc-200 transition-colors inline-flex items-center justify-center gap-2"
          >
            Continue Shopping
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/"
            className="px-8 py-4 bg-white/5 text-white font-medium hover:bg-white/10 transition-colors"
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
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="text-center">
        <Loader2 size={48} className="text-emerald-400 animate-spin mx-auto mb-4" />
        <p className="text-zinc-400">Loading...</p>
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

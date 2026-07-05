import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

// Returns the totals and selected carrier for a completed checkout session,
// so the order record reflects what Stripe actually charged.
export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["shipping_cost.shipping_rate"],
    });

    const shippingRate = session.shipping_cost?.shipping_rate;
    const carrier =
      shippingRate && typeof shippingRate !== "string"
        ? shippingRate.display_name
        : null;

    return NextResponse.json({
      subtotal: (session.amount_subtotal ?? 0) / 100,
      shipping: (session.shipping_cost?.amount_total ?? 0) / 100,
      total: (session.amount_total ?? 0) / 100,
      carrier,
      paymentStatus: session.payment_status,
    });
  } catch (error) {
    console.error("Error retrieving checkout session:", error);
    return NextResponse.json(
      { error: "Failed to retrieve session" },
      { status: 500 }
    );
  }
}

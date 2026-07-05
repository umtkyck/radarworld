import { NextResponse } from "next/server";
import { createOrder, getOrderByStripeSession } from "@/lib/firestore-admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, userId, userEmail, items, subtotal, shipping, total } = body;

    if (!sessionId || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existing = await getOrderByStripeSession(sessionId);
    if (existing) {
      return NextResponse.json({ success: true, id: existing.id, duplicate: true });
    }

    const result = await createOrder({
      userId,
      userEmail,
      items,
      subtotal: subtotal ?? 0,
      shipping: shipping ?? 0,
      total: total ?? 0,
      status: "pending",
      stripeSessionId: sessionId,
    });

    if (!result.success) {
      return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: result.id });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getProductImageSrc } from "@/lib/constants";
import { buildShippingOptions, NORTH_AMERICA_COUNTRIES } from "@/lib/shipping";
import { CartItem } from "@/types/product";

export async function POST(request: NextRequest) {
  try {
    const { items }: { items: CartItem[] } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items in cart" },
        { status: 400 }
      );
    }

    // Get Stripe instance (lazy loaded)
    const stripe = getStripe();

    // Create Stripe line items from cart items.
    // Stripe requires absolute image URLs; local paths are mapped to their
    // public fallback images just like on the storefront.
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: item.description,
          images: [getProductImageSrc(item.image, item.category, false)],
          metadata: {
            category: item.category,
            productId: item.id,
          },
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create Stripe checkout session with North American carrier options
    // (UPS, FedEx, USPS) — the customer picks carrier and service level.
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/checkout/cancel`,
      shipping_address_collection: {
        allowed_countries: [...NORTH_AMERICA_COUNTRIES],
      },
      shipping_options: buildShippingOptions(subtotal),
      billing_address_collection: "required",
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

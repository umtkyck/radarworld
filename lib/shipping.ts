import Stripe from "stripe";

// North American shipping configuration.
// Carrier rates are presented as Stripe shipping options at checkout;
// the customer picks the carrier and service level there.

export const NORTH_AMERICA_COUNTRIES = ["US", "CA", "MX"] as const;

export const FREE_SHIPPING_THRESHOLD = 1000; // USD

export interface CarrierRate {
  carrier: "UPS" | "FedEx" | "USPS";
  service: string;
  amount: number; // USD cents
  minDays: number;
  maxDays: number;
}

export const carrierRates: CarrierRate[] = [
  { carrier: "USPS", service: "Priority Mail", amount: 3900, minDays: 2, maxDays: 5 },
  { carrier: "UPS", service: "Ground", amount: 4900, minDays: 3, maxDays: 6 },
  { carrier: "FedEx", service: "Ground", amount: 5400, minDays: 3, maxDays: 6 },
  { carrier: "UPS", service: "2nd Day Air", amount: 8900, minDays: 2, maxDays: 2 },
  { carrier: "FedEx", service: "Priority Overnight", amount: 12900, minDays: 1, maxDays: 1 },
];

function toShippingOption(
  displayName: string,
  amount: number,
  minDays: number,
  maxDays: number
): Stripe.Checkout.SessionCreateParams.ShippingOption {
  return {
    shipping_rate_data: {
      type: "fixed_amount",
      display_name: displayName,
      fixed_amount: { amount, currency: "usd" },
      delivery_estimate: {
        minimum: { unit: "business_day", value: minDays },
        maximum: { unit: "business_day", value: maxDays },
      },
    },
  };
}

// Build the Stripe shipping options for a given order subtotal (USD).
// Orders over the free-shipping threshold get free ground shipping and can
// still pay for express services.
export function buildShippingOptions(
  subtotal: number
): Stripe.Checkout.SessionCreateParams.ShippingOption[] {
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  const options: Stripe.Checkout.SessionCreateParams.ShippingOption[] = [];

  if (freeShipping) {
    options.push(toShippingOption("Free Shipping (UPS Ground)", 0, 3, 6));
  }

  for (const rate of carrierRates) {
    // Ground services are replaced by the free option above the threshold
    const isGround = rate.service.includes("Ground") || rate.service === "Priority Mail";
    if (freeShipping && isGround) continue;
    options.push(
      toShippingOption(
        `${rate.carrier} ${rate.service}`,
        rate.amount,
        rate.minDays,
        rate.maxDays
      )
    );
  }

  return options;
}

// Cheapest paid rate, used for "From $X" UI estimates (USD).
export const cheapestRate = Math.min(...carrierRates.map((r) => r.amount)) / 100;

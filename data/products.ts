import { Product } from "@/types/product";

export const products: Product[] = [
  // ============================================
  // TRUE GROUND SPEED SENSOR
  // ============================================
  {
    id: "zlytgss01",
    slug: "24ghz-true-ground-speed-sensor-tgss",
    model: "ZLYTGSS01",
    name: "24GHz True Ground Speed Sensor",
    shortDescription: "Non-contact Doppler ground speed for rail and agricultural machinery",
    description:
      "The ZLYTGSS01 is a K-band Doppler radar sensor that measures true ground velocity without any mechanical contact. Unlike wheel-based sensors, it is completely immune to wheel slip, slide, and tire wear \u2014 making it the reference solution for railroad wheel-slip protection and odometry, and for rate control on agricultural machinery. It measures from 0.1 m/s up to 300 km/h and offers pulse, CAN, and RS-485 interfaces as a drop-in replacement for legacy wheel sensors. Need a custom mounting angle, speed range, output protocol, or housing? Our engineering team adapts the sensor to your platform and delivers application-specific firmware.",
    price: 245,
    originalPrice: 295,
    category: "ground-speed",
    subcategory: "Rail & Agriculture",
    image: "/images/products/ground-speed-tgss.jpg",
    features: [
      "True ground speed, immune to wheel slip and slide",
      "Ultra-low speed detection from 0.1 m/s",
      "Rail-grade speed range up to 300 km/h",
      "Pulse output mimics legacy wheel sensors",
      "CAN & RS-485 modern interfaces",
      "Works over rail bed, soil, stubble, gravel",
      "Custom firmware and housing options available",
    ],
    specifications: {
      frequency: "24.00-24.20 GHz (K-band)",
      range: "0.1 m/s - 300 km/h",
      accuracy: "\u00b10.5%",
      power: "9-36V DC, <1W",
      interface: "Pulse, CAN, RS-485",
      protection: "IP67",
      temperature: "-40\u00b0C to +85\u00b0C",
    },
    problemTags: ["ground-speed", "speed-measurement", "slip-detection"],
    applications: [
      "Locomotive wheel-slip / slide protection",
      "Rail odometry and track maintenance vehicles",
      "Tractor seeding and spraying rate control",
      "Harvesters and self-propelled machinery",
      "OEM integration with custom firmware",
    ],
    inStock: true,
    badge: "bestseller",
  },

  // ============================================
  // SPORTS TRACKING RADAR
  // ============================================
  {
    id: "zlyspt01",
    slug: "24ghz-sports-tracking-radar",
    model: "ZLYSPT01",
    name: "24GHz Ball & Swing Tracking Radar",
    shortDescription: "Ball, club, and bat tracking module for golf and baseball electronics",
    description:
      "The ZLYSPT01 is a compact Doppler radar module built for sports electronics manufacturers. In golf it captures ball speed, launch, and club head speed through impact; in baseball it measures pitch velocity, exit velocity, and bat speed \u2014 all from a single sensor. The module streams raw velocity spectra or processed metrics over UART/SPI, so it drops straight into launch monitors, pitching machines, swing analyzers, and training simulators. We supply reference designs and SDKs, and our engineering team tunes detection profiles, antenna patterns, and form factors to your product.",
    price: 389,
    originalPrice: 459,
    category: "sports",
    subcategory: "Golf & Baseball",
    image: "/images/products/sports-radar-zlyspt01.jpg",
    features: [
      "Simultaneous ball and club / bat tracking",
      "Ball speed up to 320 km/h (200 mph)",
      "Golf: ball speed, launch, club head speed",
      "Baseball: pitch speed, exit velocity, bat speed",
      "Raw spectra or processed metrics via UART/SPI",
      "SDK and reference designs included",
      "Custom detection profiles and form factors",
    ],
    specifications: {
      frequency: "24.00-24.25 GHz (K-band)",
      range: "0.5-30 meters",
      accuracy: "\u00b10.1 km/h",
      power: "5V DC, <0.8W",
      interface: "UART, SPI",
      protection: "IP54",
      temperature: "-20\u00b0C to +60\u00b0C",
      dimensions: "45 x 45 x 8 mm",
    },
    problemTags: ["ball-tracking", "swing-analysis", "launch-monitoring", "speed-measurement"],
    applications: [
      "Golf launch monitors and simulators",
      "Baseball pitch speed and exit velocity tracking",
      "Swing and bat speed analyzers",
      "Pitching machines and training systems",
      "OEM sports electronics integration",
    ],
    inStock: true,
    badge: "new",
  },
];

// Category metadata for display
export const categoryInfo: Record<string, { name: string; description: string; icon: string }> = {
  "ground-speed": {
    name: "Ground Speed",
    description: "Non-contact true ground speed for railroad and agricultural machinery",
    icon: "Gauge",
  },
  sports: {
    name: "Sports Tracking",
    description: "Ball, club, and bat tracking radar for golf and baseball electronics",
    icon: "Target",
  },
};

// Problem tags metadata
export const problemTagInfo: Record<string, { name: string; description: string }> = {
  "ground-speed": {
    name: "Ground Speed",
    description: "True ground speed for rail and agriculture",
  },
  "speed-measurement": {
    name: "Speed Measurement",
    description: "Measure object velocity accurately",
  },
  "slip-detection": {
    name: "Slip Detection",
    description: "Wheel slip and slide protection for rail",
  },
  "ball-tracking": {
    name: "Ball Tracking",
    description: "Track ball speed and trajectory",
  },
  "swing-analysis": {
    name: "Swing Analysis",
    description: "Club head and bat speed measurement",
  },
  "launch-monitoring": {
    name: "Launch Monitoring",
    description: "Launch metrics for golf and baseball",
  },
};

// Helper function to get products by category
export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

// Helper function to get products by problem tag
export function getProductsByProblemTag(tag: string): Product[] {
  return products.filter(p => p.problemTags.includes(tag as any));
}

// Helper function to search products
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.shortDescription.toLowerCase().includes(lowerQuery) ||
    p.model?.toLowerCase().includes(lowerQuery) ||
    p.applications.some(app => app.toLowerCase().includes(lowerQuery)) ||
    p.problemTags.some(tag => tag.includes(lowerQuery))
  );
}

// Get featured products
export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.badge);
}

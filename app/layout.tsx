import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000'),
  title: {
    default: "RadarWorld - Commercial & Industrial Radar Systems",
    template: "%s | RadarWorld",
  },
  description: "Premium radar solutions for commercial and industrial applications. Advanced detection, tracking, and monitoring systems. Buy 77GHz, 80GHz, 120GHz radar sensors online.",
  keywords: [
    "radar systems",
    "commercial radar",
    "industrial radar",
    "77ghz radar",
    "120ghz radar",
    "ZLY radar",
    "level sensor",
    "maritime radar",
    "traffic radar",
    "radar sensor"
  ],
  authors: [{ name: "RadarWorld" }],
  creator: "RadarWorld",
  publisher: "RadarWorld",
  applicationName: "RadarWorld",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "RadarWorld",
    title: "RadarWorld - Commercial & Industrial Radar Systems",
    description: "Premium radar solutions for commercial and industrial applications. Advanced detection, tracking, and monitoring systems.",
  },
  twitter: {
    card: "summary_large_image",
    title: "RadarWorld - Commercial & Industrial Radar Systems",
    description: "Premium radar solutions for commercial and industrial applications. Advanced detection, tracking, and monitoring systems.",
    creator: "@radarworld",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

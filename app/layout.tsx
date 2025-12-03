import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

// Use local fonts with system fallbacks for better performance and reliability
const inter = localFont({
  src: [
    {
      path: "../public/fonts/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Inter-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Inter-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Inter-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

const jetbrainsMono = localFont({
  src: [
    {
      path: "../public/fonts/JetBrainsMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/JetBrainsMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/JetBrainsMono-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "SF Mono", "Menlo", "Consolas", "monospace"],
});

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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased font-sans">
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

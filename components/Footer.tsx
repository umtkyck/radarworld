"use client";

import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#050505]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-14 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Logo size="lg" />
            <p className="mt-6 max-w-sm text-base leading-relaxed text-zinc-500">
              Doppler radar sensors for rail, agriculture, and sports electronics
              &mdash; with custom engineering from prototype to production.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="mb-6 font-mono text-xs uppercase tracking-widest text-zinc-600">
              Products
            </h4>
            <ul className="space-y-4">
              <li>
                <Link href="/shop?category=ground-speed" className="text-base text-zinc-500 transition-colors hover:text-white">
                  Ground Speed Sensor
                </Link>
              </li>
              <li>
                <Link href="/shop?category=sports" className="text-base text-zinc-500 transition-colors hover:text-white">
                  Sports Tracking Radar
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-base text-zinc-500 transition-colors hover:text-white">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-6 font-mono text-xs uppercase tracking-widest text-zinc-600">
              Company
            </h4>
            <ul className="space-y-4">
              <li>
                <Link href="/contact" className="text-base text-zinc-500 transition-colors hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="mailto:info@radarcart.com" className="text-base text-zinc-500 transition-colors hover:text-white">
                  info@radarcart.com
                </a>
              </li>
              <li>
                <a href="tel:+12246299664" className="text-base text-zinc-500 transition-colors hover:text-white">
                  +1 (224) 629-9664
                </a>
              </li>
              <li className="text-base leading-relaxed text-zinc-500">
                1109 W Bauer Rd
                <br />
                Naperville, IL 60563, US
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-10 md:flex-row">
          <p className="font-mono text-sm text-zinc-600">
            © {currentYear} Radar Cart. All rights reserved.
          </p>
          <div className="flex items-center gap-2 font-mono text-sm text-zinc-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>System Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

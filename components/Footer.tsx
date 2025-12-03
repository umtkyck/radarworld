"use client";

import Link from "next/link";
import { memo } from "react";
import { Mail, Phone, MapPin, ExternalLink, Linkedin, Twitter, Github } from "lucide-react";
import Logo from "./Logo";

const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { label: "Commercial Radars", href: "/shop?category=commercial" },
      { label: "Industrial Sensors", href: "/shop?category=industrial" },
      { label: "All Products", href: "/shop" },
    ],
    company: [
      { label: "About Us", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Support", href: "#" },
      { label: "Careers", href: "#" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Shipping Policy", href: "#" },
    ],
  };

  return (
    <footer className="bg-radar-darker border-t border-radar-cyan/10">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Logo size="md" />
            <p className="mt-4 text-radar-muted max-w-sm leading-relaxed">
              Leading provider of commercial and industrial radar systems. Precision detection technology for the modern world.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a href="mailto:info@radarworld.com" className="flex items-center gap-3 text-radar-muted hover:text-radar-cyan transition-colors">
                <Mail size={16} />
                <span className="text-sm">info@radarworld.com</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-3 text-radar-muted hover:text-radar-cyan transition-colors">
                <Phone size={16} />
                <span className="text-sm">+1 (234) 567-890</span>
              </a>
              <div className="flex items-center gap-3 text-radar-muted">
                <MapPin size={16} />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {[
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Github, href: "#", label: "GitHub" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-radar-dark border border-radar-cyan/20 flex items-center justify-center text-radar-muted hover:text-radar-cyan hover:border-radar-cyan/50 transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-mono font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Products
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-radar-muted hover:text-radar-cyan transition-colors text-sm flex items-center gap-1 group"
                  >
                    {link.label}
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-radar-muted hover:text-radar-cyan transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-mono font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-radar-muted hover:text-radar-cyan transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-radar-cyan/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-radar-muted text-sm">
              &copy; {currentYear} RadarWorld. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-radar-muted text-xs">
              <span className="w-2 h-2 rounded-full bg-radar-green animate-pulse" />
              <span>System Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;

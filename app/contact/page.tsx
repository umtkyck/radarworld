"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, Globe, Loader2 } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/contact";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setSubmitted(true);
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
            <Send size={40} className="text-emerald-600" />
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">Message Sent!</h1>
          <p className="mb-8 text-slate-500">
            Thank you for contacting us. We&apos;ll get back to you within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="rounded-lg bg-slate-900 px-8 py-4 font-medium text-white transition-colors hover:bg-slate-800"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50 py-16">
        <div className="container mx-auto px-6">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">Contact Us</h1>
          <p className="max-w-xl text-lg text-slate-500">
            Have questions about our radar systems? Our team is here to help.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Contact Info */}
          <div className="space-y-8 lg:col-span-1">
            <div>
              <h2 className="mb-6 text-xl font-bold tracking-tight text-slate-900">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100">
                    <Mail size={24} className="text-slate-900" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-slate-900">Email</h3>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-slate-500 transition-colors hover:text-slate-900">
                      {CONTACT_EMAIL}
                    </a>
                    <p className="mt-1 text-sm text-slate-400">For general inquiries</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100">
                    <Mail size={24} className="text-slate-900" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-slate-900">Technical Support</h3>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-slate-500 transition-colors hover:text-slate-900">
                      {CONTACT_EMAIL}
                    </a>
                    <p className="mt-1 text-sm text-slate-400">Product and integration help</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100">
                    <Phone size={24} className="text-slate-900" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-slate-900">Phone</h3>
                    <a href="tel:+12246299664" className="text-slate-500 transition-colors hover:text-slate-900">
                      +1 (224) 629-9664
                    </a>
                    <p className="mt-1 text-sm text-slate-400">Mon&ndash;Fri, 9am&ndash;6pm CT</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100">
                    <MapPin size={24} className="text-slate-900" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-slate-900">Address</h3>
                    <p className="text-slate-500">
                      1109 W Bauer Rd
                      <br />
                      Naperville, IL 60563
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-slate-900">
                <Clock size={20} className="text-slate-900" />
                Business Hours
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Monday - Friday</span>
                  <span className="font-medium text-slate-900">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Saturday</span>
                  <span className="font-medium text-slate-900">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Sunday</span>
                  <span className="text-slate-400">Closed</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-slate-900">
                <Globe size={20} className="text-slate-900" />
                Shipping
              </h3>
              <p className="text-sm text-slate-500">
                We ship across North America (US, Canada, Mexico) via UPS, FedEx, and USPS.
                For orders outside North America, contact our sales team for a quote.
              </p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="mt-2 inline-block text-sm font-medium text-slate-900 transition-colors hover:text-slate-600">
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-xl font-bold tracking-tight text-slate-900">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-slate-400 focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-slate-400 focus:outline-none"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="company" className="mb-2 block text-sm font-medium text-slate-700">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-slate-400 focus:outline-none"
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-700">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 transition-colors focus:border-slate-400 focus:outline-none"
                    >
                      <option value="">Select a subject</option>
                      <option value="sales">Sales Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="shipping">Shipping Question</option>
                      <option value="bulk">Bulk Order</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-colors focus:border-slate-400 focus:outline-none"
                    placeholder="Tell us about your project or question..."
                  />
                </div>

                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-8 py-4 font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 md:w-auto"
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

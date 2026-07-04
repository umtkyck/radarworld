"use client";

import { useState } from "react";
import { Mail, Send, Clock, Globe, Loader2 } from "lucide-react";
import { saveContactMessage } from "@/lib/firestore";

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
      const result = await saveContactMessage(formData);
      if (result.success) {
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
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send size={40} className="text-emerald-400" />
          </div>
          <h1 className="text-3xl font-medium tracking-tight text-white mb-4">Message Sent!</h1>
          <p className="text-zinc-400 mb-8">
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-8 py-4 bg-white text-black font-medium hover:bg-zinc-200 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header */}
      <div className="border-b border-white/10 py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-4">Contact Us</h1>
          <p className="text-zinc-400 text-lg max-w-xl">
            Have questions about our radar systems? Our team is here to help.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-xl font-medium tracking-tight text-white mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email</h3>
                    <a href="mailto:info@radarcart.com" className="text-zinc-400 hover:text-emerald-400 transition-colors">
                      info@radarcart.com
                    </a>
                    <p className="text-zinc-500 text-sm mt-1">For general inquiries</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Technical Support</h3>
                    <a href="mailto:support@radarcart.com" className="text-zinc-400 hover:text-emerald-400 transition-colors">
                      support@radarcart.com
                    </a>
                    <p className="text-zinc-500 text-sm mt-1">Product and integration help</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/10">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Clock size={20} className="text-emerald-400" />
                Business Hours
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Monday - Friday</span>
                  <span className="text-white">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Saturday</span>
                  <span className="text-white">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Sunday</span>
                  <span className="text-zinc-500">Closed</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/10">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Globe size={20} className="text-emerald-400" />
                International Sales
              </h3>
              <p className="text-zinc-400 text-sm">
                We ship to over 150 countries. Contact our international sales team for quotes and shipping information.
              </p>
              <a href="mailto:sales@radarcart.com" className="text-emerald-400 text-sm hover:text-emerald-300 transition-colors mt-2 inline-block">
                sales@radarcart.com
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/[0.02] border border-white/10 p-8">
              <h2 className="text-xl font-medium tracking-tight text-white mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-zinc-400 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-zinc-400 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                    >
                      <option value="" className="bg-zinc-900">Select a subject</option>
                      <option value="sales" className="bg-zinc-900">Sales Inquiry</option>
                      <option value="support" className="bg-zinc-900">Technical Support</option>
                      <option value="shipping" className="bg-zinc-900">Shipping Question</option>
                      <option value="bulk" className="bg-zinc-900">Bulk Order</option>
                      <option value="other" className="bg-zinc-900">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                    placeholder="Tell us about your project or question..."
                  />
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 p-4">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-8 py-4 bg-white text-black font-semibold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:bg-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed"
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

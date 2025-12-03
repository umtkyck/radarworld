"use client";

import { useState, useMemo } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List, Filter, Package, Factory, Layers } from "lucide-react";

type FilterType = "all" | "commercial" | "industrial";

const FILTER_OPTIONS = [
  { id: "all" as FilterType, label: "All Products", icon: Layers, count: products.length },
  { id: "commercial" as FilterType, label: "Commercial", icon: Package, count: products.filter(p => p.category === "commercial").length },
  { id: "industrial" as FilterType, label: "Industrial", icon: Factory, count: products.filter(p => p.category === "industrial").length },
];

export default function ShopPage() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredProducts = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((product) => product.category === filter);
  }, [filter]);

  return (
    <div className="min-h-screen bg-radar-dark">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-radar-darker to-radar-dark border-b border-radar-cyan/10 py-20 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 hud-grid opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-white">Radar</span>{" "}
              <span className="bg-gradient-to-r from-radar-cyan to-radar-green text-transparent bg-clip-text">
                Systems Shop
              </span>
            </h1>
            <p className="text-xl text-radar-muted max-w-2xl">
              Browse our complete range of commercial and industrial radar solutions.
              Precision detection technology for every application.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap gap-8">
            {[
              { label: "Products", value: products.length },
              { label: "Categories", value: 2 },
              { label: "In Stock", value: products.filter(p => p.inStock).length },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-mono font-bold text-radar-cyan">{stat.value}</div>
                <div className="text-sm text-radar-muted uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filter Section */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2 text-radar-muted">
              <Filter size={18} />
              <span className="font-mono text-sm uppercase tracking-wider">Filter by category</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {FILTER_OPTIONS.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => setFilter(option.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-sm font-medium transition-all duration-200 ${
                      filter === option.id
                        ? "bg-radar-cyan/10 text-radar-cyan border border-radar-cyan/30"
                        : "bg-radar-darker text-radar-muted border border-radar-cyan/10 hover:border-radar-cyan/30 hover:text-white"
                    }`}
                  >
                    <Icon size={16} />
                    <span>{option.label}</span>
                    <span className={`ml-1 px-1.5 py-0.5 rounded text-xs ${
                      filter === option.id ? "bg-radar-cyan/20" : "bg-white/5"
                    }`}>
                      {option.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Package size={48} className="mx-auto text-radar-muted mb-4" />
            <p className="text-radar-muted text-xl">No products found in this category.</p>
          </motion.div>
        )}

        {/* Results Info */}
        <div className="mt-10 pt-6 border-t border-radar-cyan/10">
          <p className="text-radar-muted text-sm font-mono">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>
      </div>
    </div>
  );
}

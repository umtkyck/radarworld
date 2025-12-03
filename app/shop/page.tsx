"use client";

import { useState, useMemo } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

type FilterType = "all" | "commercial" | "industrial";

export default function ShopPage() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredProducts = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((product) => product.category === filter);
  }, [filter]);

  const filterOptions = [
    { id: "all" as FilterType, label: "All", count: products.length },
    { id: "commercial" as FilterType, label: "Commercial", count: products.filter(p => p.category === "commercial").length },
    { id: "industrial" as FilterType, label: "Industrial", count: products.filter(p => p.category === "industrial").length },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-white/5 py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Shop
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl">
            Commercial and industrial radar solutions for precision detection.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setFilter(option.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === option.id
                  ? "bg-white text-black"
                  : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {option.label}
              <span className="ml-2 text-xs opacity-60">{option.count}</span>
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500">No products found.</p>
          </div>
        )}

        {/* Results count */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-zinc-600 text-sm">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>
      </div>
    </div>
  );
}

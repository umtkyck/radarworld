"use client";

import { useState } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function ShopPage() {
  const [filter, setFilter] = useState<"all" | "commercial" | "industrial">("all");

  const filteredProducts = products.filter((product) => {
    if (filter === "all") return true;
    return product.category === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Radar Systems Shop</h1>
          <p className="text-xl text-blue-100">
            Browse our complete range of commercial and industrial radar solutions
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filter Buttons */}
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              filter === "all"
                ? "bg-blue-900 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setFilter("commercial")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              filter === "commercial"
                ? "bg-blue-900 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Commercial
          </button>
          <button
            onClick={() => setFilter("industrial")}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              filter === "industrial"
                ? "bg-blue-900 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Industrial
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

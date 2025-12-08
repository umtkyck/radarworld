"use client";

import { useState, useMemo } from "react";
import { products, categoryInfo, problemTagInfo, searchProducts } from "@/data/products";
import { ProductCategory, ProblemTag } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import {
  Search,
  X,
  Car,
  Tractor,
  Shield,
  Gauge,
  Waves,
  Plane,
  Factory,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  traffic: <Car size={18} />,
  agriculture: <Tractor size={18} />,
  security: <Shield size={18} />,
  automotive: <Gauge size={18} />,
  "water-level": <Waves size={18} />,
  uav: <Plane size={18} />,
  industrial: <Factory size={18} />,
};

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all");
  const [selectedProblem, setSelectedProblem] = useState<ProblemTag | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery.trim()) {
      result = searchProducts(searchQuery);
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Problem tag filter
    if (selectedProblem !== "all") {
      result = result.filter((p) => p.problemTags.includes(selectedProblem));
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        // Featured products first, then by badge priority
        result.sort((a, b) => {
          const badgePriority = { bestseller: 3, new: 2, sale: 1 };
          const aPriority = a.badge ? badgePriority[a.badge] || 0 : 0;
          const bPriority = b.badge ? badgePriority[b.badge] || 0 : 0;
          return bPriority - aPriority;
        });
    }

    return result;
  }, [selectedCategory, selectedProblem, searchQuery, sortBy]);

  const categories = Object.keys(categoryInfo) as ProductCategory[];
  const problemTags = Object.keys(problemTagInfo) as ProblemTag[];

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedProblem("all");
    setSearchQuery("");
  };

  const hasActiveFilters = selectedCategory !== "all" || selectedProblem !== "all" || searchQuery.trim();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-white/5 py-12 md:py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Radar Sensors
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Professional millimeter wave radar sensors for traffic, agriculture, security, automotive, and industrial applications.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, model, application, or problem..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
              selectedCategory === "all"
                ? "bg-emerald-500 text-white"
                : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
            }`}
          >
            All Products
            <span className="text-xs opacity-70">{products.length}</span>
          </button>
          {categories.map((cat) => {
            const count = products.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedCategory === cat
                    ? "bg-emerald-500 text-white"
                    : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {categoryIcons[cat]}
                <span className="hidden sm:inline">{categoryInfo[cat].name}</span>
                <span className="text-xs opacity-70">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            {/* Problem Filter Dropdown */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedProblem !== "all"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-white/5 text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              <SlidersHorizontal size={16} />
              Filter by Problem
              <ChevronDown size={16} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <X size={14} />
                Clear filters
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Problem Tags Filter Panel */}
        {showFilters && (
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 mb-6">
            <h3 className="text-sm font-medium text-white mb-3">What problem are you solving?</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedProblem("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedProblem === "all"
                    ? "bg-emerald-500 text-white"
                    : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                All Problems
              </button>
              {problemTags.map((tag) => {
                const count = products.filter((p) => p.problemTags.includes(tag)).length;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedProblem(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedProblem === tag
                        ? "bg-emerald-500 text-white"
                        : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {problemTagInfo[tag].name}
                    <span className="ml-1 opacity-70">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-zinc-500">Active filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 bg-white/10 text-white text-xs px-2 py-1 rounded-full">
                Search: {searchQuery}
                <button onClick={() => setSearchQuery("")} className="hover:text-emerald-400">
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1 bg-white/10 text-white text-xs px-2 py-1 rounded-full">
                {categoryInfo[selectedCategory].name}
                <button onClick={() => setSelectedCategory("all")} className="hover:text-emerald-400">
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedProblem !== "all" && (
              <span className="inline-flex items-center gap-1 bg-white/10 text-white text-xs px-2 py-1 rounded-full">
                {problemTagInfo[selectedProblem].name}
                <button onClick={() => setSelectedProblem("all")} className="hover:text-emerald-400">
                  <X size={12} />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
            <p className="text-zinc-500 mb-4">
              Try adjusting your search or filters to find what you&apos;re looking for.
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Results count */}
        {filteredProducts.length > 0 && (
          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-zinc-600 text-sm">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

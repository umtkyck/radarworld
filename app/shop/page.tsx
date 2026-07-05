"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products, categoryInfo, problemTagInfo, searchProducts } from "@/data/products";
import { ProductCategory, ProblemTag } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";

// Pre-compute category and tag counts (static data)
const categoryCounts = Object.fromEntries(
  Object.keys(categoryInfo).map(cat => [cat, products.filter(p => p.category === cat).length])
);
const problemTagCounts = Object.fromEntries(
  Object.keys(problemTagInfo).map(tag => [tag, products.filter(p => p.problemTags.includes(tag as ProblemTag)).length])
);

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopPageLoading />}>
      <ShopPageContent />
    </Suspense>
  );
}

function ShopPageLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-sm text-slate-400">Loading&hellip;</div>
    </div>
  );
}

function ShopPageContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all");
  const [selectedProblem, setSelectedProblem] = useState<ProblemTag | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");

  // Sync URL param with state on mount and when param changes
  useEffect(() => {
    if (categoryParam && Object.keys(categoryInfo).includes(categoryParam)) {
      setSelectedCategory(categoryParam as ProductCategory);
    }
  }, [categoryParam]);

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Catalog
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Radar Sensors
          </h1>
          <p className="mt-4 max-w-2xl text-slate-500">
            True ground speed sensing for rail and agriculture, and ball &amp; swing
            tracking for sports electronics. Both platforms are available with
            custom engineering for OEM applications.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, model, application, or problem..."
            className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-12 pr-12 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-slate-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-900"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === "all"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-900"
            }`}
          >
            All
            <span className="ml-2 text-xs opacity-60">{products.length}</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-900"
              }`}
            >
              {categoryInfo[cat].name}
              <span className="ml-2 text-xs opacity-60">{categoryCounts[cat]}</span>
            </button>
          ))}
        </div>

        {/* Filter Controls */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Problem Filter Dropdown */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                selectedProblem !== "all"
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-900"
              }`}
            >
              <SlidersHorizontal size={14} />
              Filter by problem
              <ChevronDown size={14} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-2 text-sm text-slate-500 transition-colors hover:text-slate-900"
              >
                <X size={14} />
                Clear
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Sort</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
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
          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              What problem are you solving?
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedProblem("all")}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedProblem === "all"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-500 hover:border-slate-400 hover:text-slate-900"
                }`}
              >
                All problems
              </button>
              {problemTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedProblem(tag)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                    selectedProblem === tag
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-500 hover:border-slate-400 hover:text-slate-900"
                  }`}
                >
                  {problemTagInfo[tag].name}
                  <span className="ml-1 opacity-60">({problemTagCounts[tag]})</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Active</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700">
                &ldquo;{searchQuery}&rdquo;
                <button onClick={() => setSearchQuery("")} className="hover:text-slate-900">
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700">
                {categoryInfo[selectedCategory].name}
                <button onClick={() => setSelectedCategory("all")} className="hover:text-slate-900">
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedProblem !== "all" && (
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700">
                {problemTagInfo[selectedProblem].name}
                <button onClick={() => setSelectedProblem("all")} className="hover:text-slate-900">
                  <X size={12} />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <div key={product.id} className="overflow-hidden rounded-xl border border-slate-200 shadow-sm transition-shadow hover:shadow-md">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="rounded-xl border border-slate-200 py-24 text-center">
            <h3 className="text-lg font-semibold text-slate-900">No products found</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
              Try adjusting your search or filters to find what you&apos;re looking for.
            </p>
            <button
              onClick={clearFilters}
              className="mt-6 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Results count */}
        {filteredProducts.length > 0 && (
          <p className="mt-8 text-xs text-slate-400">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        )}
      </div>
    </div>
  );
}

"use client";

import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const categoryColors: Record<string, string> = {
  traffic: "bg-blue-500/10 text-blue-400",
  agriculture: "bg-green-500/10 text-green-400",
  security: "bg-red-500/10 text-red-400",
  automotive: "bg-purple-500/10 text-purple-400",
  "water-level": "bg-cyan-500/10 text-cyan-400",
  uav: "bg-orange-500/10 text-orange-400",
  industrial: "bg-emerald-500/10 text-emerald-400",
};

const badgeStyles: Record<string, string> = {
  new: "bg-blue-500 text-white",
  bestseller: "bg-emerald-500 text-white",
  sale: "bg-red-500 text-white",
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Fallback image based on category
  const fallbackImages: Record<string, string> = {
    traffic: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&q=80",
    agriculture: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop&q=80",
    security: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80",
    automotive: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop&q=80",
    "water-level": "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop&q=80",
    uav: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=600&fit=crop&q=80",
    industrial: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop&q=80",
  };

  const imageSrc = imageError
    ? fallbackImages[product.category] || fallbackImages.industrial
    : product.image.startsWith("/")
    ? fallbackImages[product.category] || fallbackImages.industrial
    : product.image;

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all h-full flex flex-col">
        {/* Image */}
        <div className="h-48 bg-zinc-900 overflow-hidden relative">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            quality={80}
            onError={() => setImageError(true)}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {product.badge && (
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${badgeStyles[product.badge]}`}>
                {product.badge === "bestseller" ? "Best Seller" : product.badge.toUpperCase()}
              </span>
            )}
            {discount > 0 && (
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-500 text-white">
                -{discount}%
              </span>
            )}
          </div>

          {product.inStock && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              In Stock
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col flex-grow">
          {/* Category & Model */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-block px-2 py-1 rounded text-xs font-medium capitalize ${
              categoryColors[product.category] || categoryColors.industrial
            }`}>
              {product.category.replace("-", " ")}
            </span>
            {product.model && (
              <span className="text-xs text-zinc-500 font-mono">
                {product.model}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-zinc-500 text-sm mb-4 flex-grow line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Key Specs */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs bg-white/5 text-zinc-400 px-2 py-1 rounded">
              {product.specifications.frequency.split(" ")[0]}
            </span>
            <span className="text-xs bg-white/5 text-zinc-400 px-2 py-1 rounded">
              {product.specifications.range.split(" ")[0]}
            </span>
          </div>

          {/* Price and Button */}
          <div className="mt-auto space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-zinc-500 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                !product.inStock
                  ? "bg-white/5 text-zinc-600 cursor-not-allowed"
                  : added
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              {!product.inStock ? (
                "Out of Stock"
              ) : added ? (
                <>
                  <Check size={16} />
                  Added!
                </>
              ) : (
                <>
                  <ShoppingCart size={16} />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

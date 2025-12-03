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

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all h-full flex flex-col">
        {/* Image */}
        <div className="h-48 bg-zinc-900 overflow-hidden relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            quality={80}
          />
          {product.inStock && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              In Stock
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col flex-grow">
          {/* Category */}
          <span className={`inline-block w-fit px-2 py-1 rounded text-xs font-medium mb-3 ${
            product.category === "commercial"
              ? "bg-cyan-500/10 text-cyan-400"
              : "bg-emerald-500/10 text-emerald-400"
          }`}>
            {product.category}
          </span>

          {/* Title */}
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-zinc-500 text-sm mb-4 flex-grow line-clamp-2">
            {product.description}
          </p>

          {/* Price and Button */}
          <div className="mt-auto space-y-3">
            <div className="text-2xl font-bold text-white">
              ${product.price.toLocaleString()}
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

"use client";

import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { getProductImageSrc, calculateDiscount } from "@/lib/constants";

interface ProductCardProps {
  product: Product;
}

const badgeLabels: Record<string, string> = {
  bestseller: "Best seller",
  new: "New",
  sale: "Sale",
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

  const discount = calculateDiscount(product.price, product.originalPrice);
  const imageSrc = getProductImageSrc(product.image, product.category, imageError);

  return (
    <Link href={`/product/${product.id}`} className="group flex h-full flex-col bg-[#050505]">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover opacity-90 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
          loading="lazy"
          quality={80}
          onError={() => setImageError(true)}
        />
        {(product.badge || discount > 0) && (
          <div className="absolute left-4 top-4 flex gap-3 font-mono text-[11px] uppercase tracking-widest">
            {product.badge && (
              <span className="bg-[#050505]/80 px-2 py-1 text-emerald-400 backdrop-blur-sm">
                {badgeLabels[product.badge] ?? product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="bg-[#050505]/80 px-2 py-1 text-zinc-300 backdrop-blur-sm">
                &minus;{discount}%
              </span>
            )}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-grow flex-col p-5">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-zinc-500">
          <span>{product.model || product.category.replaceAll("-", " ")}</span>
          {product.inStock ? (
            <span className="flex items-center gap-1.5 text-emerald-500">
              <span className="h-1 w-1 rounded-full bg-emerald-500" />
              In stock
            </span>
          ) : (
            <span className="text-zinc-600">Out of stock</span>
          )}
        </div>

        <h3 className="mt-3 text-base font-medium leading-snug tracking-tight text-white transition-colors group-hover:text-emerald-400">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 flex-grow text-sm leading-relaxed text-zinc-500">
          {product.shortDescription}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-lg text-white">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-zinc-600 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={added ? "Added to cart" : "Add to cart"}
            className={`flex h-9 w-9 items-center justify-center border transition-colors ${
              !product.inStock
                ? "cursor-not-allowed border-white/5 text-zinc-700"
                : added
                ? "border-emerald-500/50 text-emerald-400"
                : "border-white/15 text-white hover:border-emerald-500/50 hover:text-emerald-400"
            }`}
          >
            {added ? <Check size={16} /> : <Plus size={16} />}
          </button>
        </div>
      </div>
    </Link>
  );
}

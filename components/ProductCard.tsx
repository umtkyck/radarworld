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
    <Link href={`/product/${product.id}`} className="group flex h-full flex-col bg-white">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          quality={80}
          onError={() => setImageError(true)}
        />
        {(product.badge || discount > 0) && (
          <div className="absolute left-3 top-3 flex gap-2 text-[11px] font-semibold">
            {product.badge && (
              <span className="rounded-full bg-slate-900 px-2.5 py-1 text-white">
                {badgeLabels[product.badge] ?? product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="rounded-full bg-white px-2.5 py-1 text-slate-700 shadow-sm">
                &minus;{discount}%
              </span>
            )}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-grow flex-col p-5">
        <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-wider text-slate-400">
          <span>{product.model || product.category.replaceAll("-", " ")}</span>
          {product.inStock ? (
            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              In stock
            </span>
          ) : (
            <span className="text-slate-400">Out of stock</span>
          )}
        </div>

        <h3 className="mt-3 text-base font-semibold leading-snug tracking-tight text-slate-900">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 flex-grow text-sm leading-relaxed text-slate-500">
          {product.shortDescription}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-slate-900">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={added ? "Added to cart" : "Add to cart"}
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
              !product.inStock
                ? "cursor-not-allowed border-slate-100 text-slate-300"
                : added
                ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                : "border-slate-200 text-slate-900 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
            }`}
          >
            {added ? <Check size={16} /> : <Plus size={16} />}
          </button>
        </div>
      </div>
    </Link>
  );
}

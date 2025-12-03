"use client";

import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ShoppingCart, Check, Package, Factory } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = React.memo(function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const CategoryIcon = product.category === "commercial" ? Package : Factory;

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group bg-radar-darker border border-radar-cyan/10 rounded-xl overflow-hidden hover:border-radar-cyan/30 transition-all duration-300 h-full flex flex-col">
        {/* Image */}
        <div className="h-48 bg-radar-dark overflow-hidden relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            quality={80}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-radar-darker/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Stock badge */}
          {product.inStock && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-radar-green/20 text-radar-green text-xs font-mono px-2 py-1 rounded-md border border-radar-green/30">
              <span className="w-1.5 h-1.5 rounded-full bg-radar-green animate-pulse" />
              <span>In Stock</span>
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col flex-grow">
          {/* Category */}
          <div className="mb-3">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono ${
              product.category === "commercial"
                ? "bg-radar-cyan/10 text-radar-cyan border border-radar-cyan/20"
                : "bg-radar-green/10 text-radar-green border border-radar-green/20"
            }`}>
              <CategoryIcon size={12} />
              {product.category.toUpperCase()}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-radar-cyan transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-radar-muted text-sm mb-4 flex-grow line-clamp-2">
            {product.description}
          </p>

          {/* Price and Add to Cart */}
          <div className="mt-auto space-y-3">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs text-radar-muted block">Price</span>
                <span className="text-2xl font-bold font-mono text-white">
                  ${product.price.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-2.5 rounded-lg font-mono text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                !product.inStock
                  ? "bg-radar-dark text-radar-muted cursor-not-allowed border border-radar-cyan/10"
                  : added
                  ? "bg-radar-green/20 text-radar-green border border-radar-green/30"
                  : "bg-radar-cyan/10 text-radar-cyan border border-radar-cyan/30 hover:bg-radar-cyan/20"
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
});

export default ProductCard;

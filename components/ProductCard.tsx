"use client";

import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import React from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = React.memo(function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
        <div className="h-48 bg-gray-200 overflow-hidden relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
            quality={80}
          />
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-2">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              product.category === "commercial"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
            }`}>
              {product.category.toUpperCase()}
            </span>
          </div>

          <h3 className="text-xl font-bold mb-2 text-gray-900">{product.name}</h3>
          <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{product.description}</p>

          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl font-bold text-blue-900">
                ${product.price.toLocaleString()}
              </span>
              <span className={`text-sm font-semibold ${
                product.inStock ? "text-green-600" : "text-red-600"
              }`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                product.inStock
                  ? "bg-blue-900 text-white hover:bg-blue-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
});

export default ProductCard;

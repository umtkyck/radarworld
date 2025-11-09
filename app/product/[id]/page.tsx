"use client";

import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useState, use } from "react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <Link href="/shop" className="text-blue-900 hover:underline mb-8 inline-block">
          ← Back to Shop
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="bg-gray-200 h-96 md:h-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="p-8">
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  product.category === "commercial"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}>
                  {product.category.toUpperCase()}
                </span>
              </div>

              <h1 className="text-4xl font-bold mb-4 text-gray-900">{product.name}</h1>
              <p className="text-gray-600 mb-6 text-lg">{product.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-blue-900">
                  ${product.price.toLocaleString()}
                </span>
                <span className={`ml-4 text-sm font-semibold ${
                  product.inStock ? "text-green-600" : "text-red-600"
                }`}>
                  {product.inStock ? "✓ In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Technical Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Range</p>
                    <p className="font-semibold">{product.specifications.range}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Frequency</p>
                    <p className="font-semibold">{product.specifications.frequency}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Power</p>
                    <p className="font-semibold">{product.specifications.power}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Resolution</p>
                    <p className="font-semibold">{product.specifications.resolution}</p>
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex gap-4 items-center">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                    product.inStock
                      ? "bg-blue-900 text-white hover:bg-blue-800"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {added ? "✓ Added to Cart!" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

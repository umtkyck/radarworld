"use client";

import { products, categoryInfo } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, use, useCallback, useMemo } from "react";
import { Check, ChevronLeft, Minus, Plus } from "lucide-react";
import { getProductImageSrc, calculateDiscount } from "@/lib/constants";
import ProductCard from "@/components/ProductCard";

const badgeLabels: Record<string, string> = {
  bestseller: "Best seller",
  new: "New",
  sale: "Sale",
};

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const { addToCartMultiple } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!product) {
    notFound();
  }

  const handleAddToCart = useCallback(() => {
    addToCartMultiple(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }, [product, quantity, addToCartMultiple]);

  // Related products (same category, different product) - memoized
  const relatedProducts = useMemo(() =>
    products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4),
    [product.category, product.id]
  );

  const imageSrc = getProductImageSrc(product.image, product.category, imageError);
  const discount = calculateDiscount(product.price, product.originalPrice);

  const specs: { label: string; value: string | undefined }[] = [
    { label: "Frequency", value: product.specifications.frequency },
    { label: "Range", value: product.specifications.range },
    { label: "Accuracy", value: product.specifications.accuracy },
    { label: "Power", value: product.specifications.power },
    { label: "Interface", value: product.specifications.interface },
    { label: "Protection", value: product.specifications.protection },
    { label: "Temperature", value: product.specifications.temperature },
    { label: "Weight", value: product.specifications.weight },
  ];

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Breadcrumb */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-600">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/shop" className="transition-colors hover:text-white">Shop</Link>
            <span>/</span>
            <Link
              href={`/shop?category=${product.category}`}
              className="capitalize transition-colors hover:text-white"
            >
              {categoryInfo[product.category]?.name || product.category}
            </Link>
            <span>/</span>
            <span className="max-w-[200px] truncate text-zinc-400">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href="/shop"
          className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-500 transition-colors hover:text-white"
        >
          <ChevronLeft size={14} />
          Back to shop
        </Link>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Product Image */}
          <div>
            <div className="relative aspect-square overflow-hidden border border-white/10 bg-zinc-950">
              <Image
                src={imageSrc}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
                quality={90}
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
          </div>

          {/* Product Details */}
          <div>
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-zinc-500">
              <span>
                {categoryInfo[product.category]?.name || product.category}
                {product.model && <span className="ml-3 text-zinc-600">{product.model}</span>}
              </span>
              {product.inStock ? (
                <span className="flex items-center gap-1.5 text-emerald-500">
                  <span className="h-1 w-1 rounded-full bg-emerald-500" />
                  In stock
                </span>
              ) : (
                <span className="text-zinc-600">Out of stock</span>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-medium tracking-tight text-white md:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 leading-relaxed text-zinc-400">{product.description}</p>

            {/* Price */}
            <div className="mt-8 flex items-baseline gap-3">
              <span className="font-mono text-3xl text-white">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="font-mono text-lg text-zinc-600 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="font-mono text-sm text-zinc-600">USD</span>
            </div>

            {/* Add to Cart */}
            <div className="mt-8 flex items-stretch gap-3">
              <div className="flex items-center border border-white/15">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="p-3 text-zinc-400 transition-colors hover:text-white"
                >
                  <Minus size={16} />
                </button>
                <span className="min-w-[48px] text-center font-mono text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  className="p-3 text-zinc-400 transition-colors hover:text-white"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex flex-1 items-center justify-center gap-2 px-6 text-sm font-medium transition-colors ${
                  !product.inStock
                    ? "cursor-not-allowed border border-white/5 text-zinc-600"
                    : added
                    ? "bg-emerald-500 text-black"
                    : "bg-white text-black hover:bg-zinc-200"
                }`}
              >
                {!product.inStock ? (
                  "Out of stock"
                ) : added ? (
                  <>
                    <Check size={16} />
                    Added to cart
                  </>
                ) : (
                  "Add to cart"
                )}
              </button>
            </div>

            {/* Shipping notes */}
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-zinc-600">
              <span>Free shipping $1,000+</span>
              <span>2 year warranty</span>
              <span>Ships worldwide</span>
            </div>

            {/* Applications */}
            {product.applications && product.applications.length > 0 && (
              <div className="mt-10">
                <h3 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  Applications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app, index) => (
                    <span
                      key={index}
                      className="border border-white/10 px-3 py-1.5 text-xs text-zinc-400"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            <div className="mt-10">
              <h3 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                Key features
              </h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <Check size={15} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                    <span className="text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="mt-10">
              <h3 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                Technical specifications
              </h3>
              <dl className="border-t border-white/10">
                {specs
                  .filter((spec) => spec.value)
                  .map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-baseline justify-between gap-6 border-b border-white/10 py-3"
                    >
                      <dt className="text-sm text-zinc-500">{spec.label}</dt>
                      <dd className="text-right font-mono text-sm text-white">{spec.value}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <div className="mb-10 border-t border-white/10 pt-6">
              <span className="font-mono text-xs tracking-widest text-emerald-500">Related</span>
              <h2 className="mt-2 text-2xl font-medium tracking-tight text-white">
                More {categoryInfo[product.category]?.name || "products"}
              </h2>
            </div>
            <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

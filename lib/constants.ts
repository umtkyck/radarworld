// Shared constants for product display

export const fallbackImages: Record<string, string> = {
  "ground-speed": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop&q=80",
  sports: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=600&fit=crop&q=80",
};

const defaultFallbackImage = fallbackImages["ground-speed"];

// Helper to get product image with fallback
export function getProductImageSrc(
  image: string,
  category: string,
  imageError: boolean
): string {
  if (imageError) {
    return fallbackImages[category] || defaultFallbackImage;
  }
  // Local images starting with / use fallback since they may not exist
  if (image.startsWith("/")) {
    return fallbackImages[category] || defaultFallbackImage;
  }
  return image;
}

// Calculate discount percentage
export function calculateDiscount(price: number, originalPrice?: number): number {
  if (!originalPrice) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

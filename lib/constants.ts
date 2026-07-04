// Shared constants for product display

export const fallbackImages: Record<string, string> = {
  traffic: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&q=80",
  agriculture: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop&q=80",
  security: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80",
  automotive: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop&q=80",
  "water-level": "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop&q=80",
  uav: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=600&fit=crop&q=80",
  industrial: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop&q=80",
};

// Helper to get product image with fallback
export function getProductImageSrc(
  image: string,
  category: string,
  imageError: boolean
): string {
  if (imageError) {
    return fallbackImages[category] || fallbackImages.industrial;
  }
  // Local images starting with / use fallback since they may not exist
  if (image.startsWith("/")) {
    return fallbackImages[category] || fallbackImages.industrial;
  }
  return image;
}

// Calculate discount percentage
export function calculateDiscount(price: number, originalPrice?: number): number {
  if (!originalPrice) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

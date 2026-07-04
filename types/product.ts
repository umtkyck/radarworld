export type ProductCategory = "ground-speed" | "sports";

export type ProblemTag =
  | "ground-speed"
  | "speed-measurement"
  | "slip-detection"
  | "ball-tracking"
  | "swing-analysis"
  | "launch-monitoring";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  subcategory?: string;
  image: string;
  gallery?: string[];
  features: string[];
  specifications: {
    frequency: string;
    range: string;
    accuracy?: string;
    power: string;
    interface?: string;
    protection?: string;
    temperature?: string;
    dimensions?: string;
    weight?: string;
  };
  problemTags: ProblemTag[];
  applications: string[];
  inStock: boolean;
  badge?: "new" | "bestseller" | "sale";
  model?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ProductFilter {
  category?: ProductCategory;
  problemTag?: ProblemTag;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
}

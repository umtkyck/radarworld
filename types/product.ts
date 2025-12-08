export type ProductCategory =
  | "traffic"
  | "agriculture"
  | "security"
  | "automotive"
  | "water-level"
  | "uav"
  | "industrial";

export type ProblemTag =
  | "speed-measurement"
  | "collision-avoidance"
  | "blind-spot-detection"
  | "level-monitoring"
  | "perimeter-protection"
  | "ground-speed"
  | "altitude-measurement"
  | "traffic-management"
  | "vehicle-detection"
  | "flood-warning"
  | "tank-monitoring"
  | "drone-navigation"
  | "adas"
  | "parking-assist"
  | "intrusion-detection";

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

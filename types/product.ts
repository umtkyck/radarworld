export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "commercial" | "industrial";
  image: string;
  features: string[];
  specifications: {
    range: string;
    frequency: string;
    power: string;
    resolution: string;
  };
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

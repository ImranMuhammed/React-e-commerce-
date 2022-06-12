export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: Rating;
}

export interface Rating {
  count: number;
  rate: number;
}

export interface Cart {
  product: Product;
  size: string;
  qty: number;
}

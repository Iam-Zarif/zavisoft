export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: Category;
}

export interface CartItem {
  id: number;
  title: string;
  description: string;
  color: string;
  price: number;
  image: string;
  quantity: number;
  size: number;
}

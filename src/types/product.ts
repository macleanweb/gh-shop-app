import type { Category } from './category';

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: Category;
}

export interface ProductGroup {
  category: Category;
  products: Product[];
}

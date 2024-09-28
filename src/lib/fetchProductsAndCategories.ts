import groupProductsByCategory from './groupProductsByCategory';
import type { Category } from '~/types/category';
import type { ProductGroup } from '~/types/product';

export const fetchProductsAndCategories = async (): Promise<ProductGroup[]> => {
  const response = await fetch(`${process.env.NEXT_HOST}/api/products-and-categories`);

  if (!response.ok) {
    throw new Error('Failed to fetch products and categories');
  }

  const { products, categories } = await response.json();

  const sortedCategories = categories.sort((a: Category, b: Category) => a.order - b.order);
  const groupedProducts: ProductGroup[] = groupProductsByCategory(products, sortedCategories);

  return groupedProducts;
};

import groupProductsByCategory from './groupProductsByCategory'
import type { Category } from '~/types/category'
import type { ProductGroup } from '~/types/product'

export const fetchProductsAndCategories = async (): Promise<ProductGroup[]> => {
	const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT
	const API_PARAM = process.env.NEXT_PUBLIC_API_PARAM ?? ''

	const [productsRes, categoriesRes] = await Promise.all([
		fetch(`${API_ENDPOINT}/products/${API_PARAM}`),
		fetch(`${API_ENDPOINT}/categories/${API_PARAM}`),
	])

	const [products, categories] = await Promise.all([productsRes.json(), categoriesRes.json()])

	const sortedCategories = categories.sort((a: Category, b: Category) => a.order - b.order)
	const groupedProducts: ProductGroup[] = groupProductsByCategory(products, sortedCategories)

	return groupedProducts
}

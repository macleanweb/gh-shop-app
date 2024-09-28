import type { Product, ProductGroup } from '~/types/product'
import type { Category } from '~/types/category'

export default function groupProductsByCategory(products: Product[], categories: Category[]): ProductGroup[] {
	const groupedProducts = categories.map((category) => {
		const productsInCategory = products.filter((product) => product.category.name === category.name)
		const sortedProducts = productsInCategory.sort((a, b) => a.price - b.price)

		return {
			category,
			products: sortedProducts,
		}
	})
	return groupedProducts
}

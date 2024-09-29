import ProductCard from '~/components/ProductCard/ProductCard'
import { fetchProductsAndCategories } from '~/lib/fetchProductsAndCategories'
import type { ProductGroup } from '~/types/product'

export async function getServerSideProps() {
	try {
		const groupedProducts = await fetchProductsAndCategories()
		return {
			props: {
				groupedProducts,
			},
		}
	} catch (error) {
		console.error(error)
		return {
			props: {
				groupedProducts: [],
				error: 'An error occurred while fetching products and categories.',
			},
		}
	}
}

interface ProductsPageProps {
	groupedProducts: ProductGroup[]
	error?: string
}

export default function ProductsPage({ groupedProducts, error }: ProductsPageProps) {
	if (error) {
		return <div>Error: {error}</div>
	}

	return (
		<div>
			<h2 className="text-lg">Products</h2>
			<div>
				{groupedProducts.map((group, index) => (
					<div key={index}>
						<h3 className="text-lg font-bold text-center mt-4 md:mt-8 mb-2 md:mb-6 p-2">
							{group.category.name}
						</h3>
						<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
							{group.products.map((product, i) => (
								<ProductCard key={product.id} {...product} index={i} />
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

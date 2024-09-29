import type { NextApiRequest, NextApiResponse } from 'next'
import type { Product } from '~/types/product'
import type { Category } from '~/types/category'

const fetchWithRetry = async <T>(url: string, retries: number = 3): Promise<T> => {
	const response = await fetch(url)
	if (!response.ok) {
		if (retries > 0) {
			return fetchWithRetry(url, retries - 1)
		}
		throw new Error(`Failed to fetch: ${response.statusText}`)
	}
	return response.json()
}

const fetchProducts = (retries: number = 3): Promise<Product[]> => {
	const API_URL = process.env.NEXT_PUBLIC_API_URL
	return fetchWithRetry<Product[]>(`${API_URL}/products/`, retries)
}

const fetchCategories = (retries: number = 3): Promise<Category[]> => {
	const API_URL = process.env.NEXT_PUBLIC_API_URL
	return fetchWithRetry<Category[]>(`${API_URL}/categories/`, retries)
}

// Combined handler for products and categories
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()])

		res.status(200).json({ products, categories })
	} catch (error) {
		res.status(500).json({ message: (error as Error).message })
	}
}

import { Product } from './product'

export interface AddToCartProduct {
	id: number
	quantity: number
}

export interface CartProduct {
	id: number
	quantity: number
	product: Product
}
export interface Cart {
	id: number
	createdAt: string
	status: string
	products: CartProduct[]
}

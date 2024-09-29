import type { Cart, CartProduct, AddToCartProduct } from '~/types/cart'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchCart(cartId: number | null) {
	if (!cartId) {
		return null
	}
	try {
		const response = await fetch(`${API_URL}/orders/${cartId}`)
		if (!response.ok) {
			throw new Error('Error fetching cart')
		}
		const data = await response.json()
		return data
	} catch (error) {
		throw new Error('Error fetching cart')
	}
}

async function createNewOrder(productsToAdd: AddToCartProduct[]) {
	try {
		const response = await fetch(`${API_URL}/orders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ products: productsToAdd }),
		})

		if (!response.ok) {
			throw new Error('Error creating order')
		}

		const data = await response.json()
		return data.id
	} catch (error) {
		throw new Error('Error creating order')
	}
}

export async function updateProductQuantity(cartData: Cart, productInCart: CartProduct, action: string = 'increase') {
	const cartId = cartData.id
	const currentQuantity = productInCart.quantity
	const newQuantity = action === 'increase' ? currentQuantity + 1 : currentQuantity - 1
	if (newQuantity < 1) {
		const productsWithQuantity = cartData.products.filter(
			(product) => product.product.id !== productInCart.product.id,
		)
		const payload = productsWithQuantity.map((product) => ({
			id: product.product.id,
			quantity: product.quantity,
		}))
		return await createNewOrder(payload)
	}
	const payload = {
		action: 'update_quantity',
		productId: productInCart.product.id,
		quantity: newQuantity,
	}
	try {
		const response = await fetch(`${API_URL}/orders/${cartId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})

		if (!response.ok) {
			throw new Error('Error updating order')
		}
	} catch (error) {
		throw new Error('Error updating order')
	}
}

export async function addToCart(productId: number, cartData: Cart | undefined) {
	// If there is no cart, create a new one
	if (!cartData || cartData?.status === 'PURCHASED') {
		const payLoad = [
			{
				id: productId,
				quantity: 1,
			},
		]
		const newCartId = await createNewOrder(payLoad)
		return newCartId
	}
	// If the product is not already in the order we have to create a new order
	const productInCart = cartData.products.find((product: CartProduct) => product.product.id === productId)
	if (!productInCart) {
		const existingProducts = cartData.products.map((product: CartProduct) => ({
			id: product.product.id,
			quantity: product.quantity,
		}))
		const newProduct = {
			id: productId,
			quantity: 1,
		}
		const productsToAdd = [...existingProducts, newProduct]
		const newCartId = await createNewOrder(productsToAdd)
		return newCartId
	}
	// If the product is already in the order we have to update the quantity of the product
	await updateProductQuantity(cartData, productInCart)
}

export async function purchaseOrder(cartId: number | null) {
	if (!cartId) {
		throw new Error('No cart to purchase')
	}
	try {
		const response = await fetch(`${API_URL}/orders/${cartId}/buy`, {
			method: 'POST',
		})

		if (!response.ok) {
			throw new Error('Error purchasing cart')
		}
	} catch (error) {
		throw new Error('Error purchasing cart')
	}
}

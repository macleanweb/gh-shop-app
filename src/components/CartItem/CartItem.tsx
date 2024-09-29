import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAppContext } from '~/context/AppContext'
import { updateProductQuantity } from '~/lib/cartService'
import type { CartProduct } from '~/types/cart'
import formatPrice from '~/lib/formatPrice'

interface CartItemProps {
	product: CartProduct
}

export function CartItem({ product }: CartItemProps) {
	const { setCartId, cartData } = useAppContext()
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: (action: 'increase' | 'decrease') =>
			updateProductQuantity(
				cartData!,
				{
					quantity: product.quantity,
					product: product.product,
					id: product.product.id,
				},
				action,
			),
		retry: 3,
		onSuccess: (data) => {
			if (data) {
				setCartId(data)
			}
			queryClient.invalidateQueries({
				queryKey: ['cart'],
			})
		},
		onError: (error) => {
			console.error('Error updating cart item:', error)
		},
	})

	return (
		<div key={product.product.id} className="flex items-center justify-between mt-4">
			<div>
				<h3 className="font-bold">{product.product.name}</h3>
				<p>Quantity: {product.quantity}</p>
				<button
					className="px-2 mr-2 py-1 bg-pink-800 text-white rounded hover:bg-pink-900 disabled:opacity-50"
					onClick={() => mutation.mutate('decrease')}
					disabled={mutation.isPending}
				>
					-
				</button>
				<button
					className="px-2 py-1 bg-pink-800 text-white rounded hover:bg-pink-900"
					onClick={() => mutation.mutate('increase')}
					disabled={mutation.isPending}
				>
					+
				</button>
			</div>
			<p>{formatPrice(product.product.price * product.quantity)}</p>
		</div>
	)
}

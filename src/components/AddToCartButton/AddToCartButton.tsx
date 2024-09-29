import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAppContext } from '~/context/AppContext'
import { addToCart } from '~/lib/cartService'

export default function AddToCartButton({ productId }: { productId: number }) {
	const { setCartId, cartData, cartLoading, setCartLoading } = useAppContext()
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: () => addToCart(productId, cartData),
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
			console.error('Error adding to cart:', error)
		},
	})

	return (
		<button
			className="mt-4 px-4 py-2 bg-pink-800 text-white rounded hover:bg-pink-900 disabled:opacity-50"
			onClick={() => mutation.mutate()}
			disabled={mutation.isPending}
		>
			{mutation.isPending ? 'Adding...' : 'Add to cart'}
		</button>
	)
}

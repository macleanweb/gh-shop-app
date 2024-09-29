import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useAppContext } from '~/context/AppContext'
import { purchaseOrder } from '~/lib/cartService'

export function CheckoutButton() {
	const queryClient = useQueryClient()
	const { cartId, cartData } = useAppContext()
	const mutation = useMutation({
		mutationFn: () => purchaseOrder(cartId),
		retry: 3,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['cart'],
			})
		},
		onError: (error) => {
			console.error('Error purchasing order:', error)
		},
	})

	if (cartData?.status === 'PURCHASED') return <p className="my-4">Order purchased successfully!</p>
	if (mutation.isError) return <p className="my-4">Error purchasing order</p>

	return (
		<button
			className="px-4 py-2 my-4 bg-pink-800 text-white rounded hover:bg-pink-900"
			disabled={mutation.isPending || !cartId}
			onClick={() => mutation.mutate()}
		>
			{mutation.isPending ? 'Purchasing...' : 'Purchase Order'}
		</button>
	)
}

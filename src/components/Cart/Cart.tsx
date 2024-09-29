import type { CartProduct } from '~/types/cart'
import { useAppContext } from '~/context/AppContext'
import formatPrice from '~/lib/formatPrice'
import { CheckoutButton } from '../CheckoutButton/CheckoutButton'
import { CartItem } from '../CartItem/CartItem'

export function Cart() {
	const { isCartOpen, closeCart, cartData } = useAppContext()
	const productsInCart = cartData?.products as CartProduct[] | null
	const totalCost =
		productsInCart?.reduce((total, product) => {
			return total + product.product.price * product.quantity
		}, 0) || 0

	return (
		<div
			className={`fixed top-0 right-0 w-64 h-full z-50 bg-slate-300 text-slate-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
				isCartOpen ? 'translate-x-0' : 'translate-x-full'
			}`}
		>
			<div className="p-4">
				<button
					className="absolute top-2 right-2 px-3 py-1 bg-pink-800 text-white rounded-full hover:bg-pink-900 transition duration-200"
					onClick={closeCart}
				>
					X
				</button>
				<h2 className="text-lg font-bold">Your Cart</h2>
				{!productsInCart || productsInCart.length === 0 ? (
					<p>Your cart is empty</p>
				) : (
					<>
						{productsInCart.map((product) => (
							<CartItem key={product.product.id} product={product} />
						))}
						<div className="mt-4 font-bold">Total Cost: {formatPrice(totalCost)}</div>
						<CheckoutButton />
					</>
				)}
			</div>
		</div>
	)
}

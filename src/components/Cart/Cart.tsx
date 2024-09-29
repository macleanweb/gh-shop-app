import type { CartProduct } from '~/types/cart'
import { useAppContext } from '~/context/AppContext'
import formatPrice from '~/lib/formatPrice'
import { CheckoutButton } from '../CheckoutButton/CheckoutButton'
import { CartItem } from '../CartItem/CartItem'

export function Cart() {
	const { isCartOpen, closeCart, cartData } = useAppContext()
	const productsInCart = cartData?.products as CartProduct[] | null

	return (
		<div
			className={`fixed top-0 right-0 w-64 h-full z-50 bg-slate-300 text-slate-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
				isCartOpen ? 'translate-x-0' : 'translate-x-full'
			}`}
		>
			<div className="p-4">
				<button className="absolute top-2 right-2" onClick={closeCart}>
					X
				</button>
				<h2 className="text-lg font-bold">Your Cart</h2>
				{!productsInCart || productsInCart.length === 0 ? (
					<p>Your cart is empty</p>
				) : (
					<div>
						{productsInCart.map((product) => (
							<CartItem key={product.product.id} product={product} />
						))}
						<CheckoutButton />
					</div>
				)}
			</div>
		</div>
	)
}

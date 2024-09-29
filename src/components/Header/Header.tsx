import Link from 'next/link'
import { useAppContext } from '~/context/AppContext'

export default function Header() {
	const { openCart, cartData } = useAppContext()
	const cartCount = cartData?.products.reduce((sum, product) => sum + product.quantity, 0) || 0

	return (
		<header className="sticky top-0 z-40 flex justify-between items-center p-4 bg-slate-700 text-slate-100">
			<h1 className="mr-2 text-xl md:text-2xl font-bold">Mock Store</h1>
			<nav>
				<ul className="flex items-center space-x-4">
					<li>
						<Link href="/">Home</Link>
					</li>
					<li>
						<Link href="/products">Products</Link>
					</li>
					<li>
						<button
							onClick={openCart}
							className="px-2 py-1 text-sm md:px-4 md:py-2 bg-pink-800 text-white rounded hover:bg-pink-900"
						>
							Cart {cartCount > 0 && `(${cartCount})`}
						</button>
					</li>
				</ul>
			</nav>
		</header>
	)
}

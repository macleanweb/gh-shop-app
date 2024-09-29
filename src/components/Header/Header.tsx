import Link from 'next/link'
import { useAppContext } from '~/context/AppContext'

export default function Header() {
	const { openCart } = useAppContext()

	return (
		<header className="sticky top-0 z-40 flex justify-between items-center p-4 bg-slate-700 text-slate-100">
			<h1 className="text-2xl font-bold">Mock Store</h1>
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
							className="px-4 py-2 bg-pink-800 text-white rounded hover:bg-pink-900"
						>
							Open Cart
						</button>
					</li>
				</ul>
			</nav>
		</header>
	)
}

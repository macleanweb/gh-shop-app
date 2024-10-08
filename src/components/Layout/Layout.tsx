// components/Layout.tsx
import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import Header from '~/components/Header/Header'
import Footer from '~/components/Footer/Footer'
import { Cart } from '~/components/Cart/Cart'

const inter = Inter({ subsets: ['latin'] })

interface LayoutProps {
	children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
	return (
		<>
			<Header />
			<div className={`flex min-h-screen flex-col items-center justify-between p-6 md:p-12 ${inter.className}`}>
				<div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
					<main className="max-w-screen-2xl mx-auto px-3">{children}</main>
				</div>
			</div>
			<Cart />
			<Footer />
		</>
	)
}

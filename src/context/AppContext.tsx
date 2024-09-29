import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Cart } from '~/types/cart'
import { useQuery } from '@tanstack/react-query'
import { fetchCart } from '~/lib/cartService'

interface AppContextType {
	isCartOpen: boolean
	openCart: () => void
	closeCart: () => void
	cartId: number | null
	setCartId: (cartId: number | null) => void
	cartData: Cart | undefined
	cartLoading: boolean
	setCartLoading: (loading: boolean) => void
	cartError: boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const useAppContext = () => {
	const context = useContext(AppContext)
	if (!context) {
		throw new Error('useAppContext must be used within an AppContextProvider')
	}
	return context
}

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [cartId, setCartId] = useState<number | null>(null)
	const [cartData, setCartData] = useState<Cart | undefined>(undefined)
	const [cartLoading, setCartLoading] = useState(false)
	const [cartError, setCartError] = useState(false)

	useEffect(() => {
		const savedCartId = localStorage.getItem('cartId')
		if (savedCartId) {
			setCartId(Number(savedCartId))
		}
	}, [])

	const { data, isLoading, isError } = useQuery({
		queryKey: ['cart', cartId],
		queryFn: async () => fetchCart(cartId),
		enabled: !!cartId,
	})

	useEffect(() => {
		if (data) {
			setCartData(data)
		}
	}, [data])

	useEffect(() => {
		setCartLoading(isLoading)
	}, [isLoading])

	useEffect(() => {
		setCartError(isError)
	}, [isError])

	useEffect(() => {
		if (cartId !== null) {
			localStorage.setItem('cartId', String(cartId))
		} else {
			localStorage.removeItem('cartId') // Remove cartId if null
		}
	}, [cartId])

	const openCart = () => setIsCartOpen(true)
	const closeCart = () => setIsCartOpen(false)

	return (
		<AppContext.Provider
			value={{
				isCartOpen,
				openCart,
				closeCart,
				cartId,
				setCartId,
				cartData,
				cartLoading,
				setCartLoading,
				cartError,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

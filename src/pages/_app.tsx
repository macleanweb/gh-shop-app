import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppContextProvider } from '~/context/AppContext'
import Layout from '~/components/Layout/Layout'
import '~/styles/globals.css'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
	require('~/../mocks')
}

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={new QueryClient()}>
			<AppContextProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</AppContextProvider>
		</QueryClientProvider>
	)
}

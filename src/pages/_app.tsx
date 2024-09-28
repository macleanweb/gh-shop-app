import type { AppProps } from 'next/app'
import Layout from '~/components/Layout/Layout';
import '~/styles/globals.css'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
	require('~/../mocks')
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

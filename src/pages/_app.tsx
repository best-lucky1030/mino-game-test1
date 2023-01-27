/* eslint-disable @next/next/no-img-element */
import '../styles/globals.css'
import '../styles/custom.css'
import type { AppProps } from 'next/app'
import WalletProvider from '../context/WalletProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>
  )
}

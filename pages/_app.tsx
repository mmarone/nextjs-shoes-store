import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Shoes store</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

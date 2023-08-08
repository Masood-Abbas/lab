// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import store from '../store'
import Loader from '@/components/common/Loader/Loader'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { injectStore } from '@/utils/axios'
import Layout from '@/components/common/Layout/Layout'
import 'react-complex-tree/lib/style-modern.css'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import 'react-datepicker/dist/react-datepicker.css'

// ** Global css styles
import '../../styles/global.css'

injectStore(store)

// ** Configure JSS & ClassName
const App = props => {
  const { Component, pageProps } = props
  const queryClient = new QueryClient()

  const [loading, SetLoading] = useState(false)

  useEffect(() => {
    Router.events.on('routeChangeStart', url => {
      SetLoading(true)
    })

    Router.events.on('routeChangeComplete', url => {
      SetLoading(false)
    })
  }, [])

  if (Component.getLayout) {
    return Component.getLayout(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Head>
            <title>DigiLab</title>
            <meta name='description' content='almana digilab.' />
          </Head>
          <Component {...pageProps} />
          <ToastContainer theme='colored' />
        </QueryClientProvider>
      </Provider>
    )
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>DigiLab</title>
        </Head>
        {loading && <Loader />}
        <Layout>
          <Component {...pageProps} />
          <ToastContainer theme='colored' />
        </Layout>
      </QueryClientProvider>
    </Provider>
  )
}

export default App

import '../styles/globals.css'
import React from 'react'
import Layout from '../Components/Layout'
import { StateContext } from '../context/StateContext'
import { Toaster } from 'react-hot-toast'
function MyApp({ Component, pageProps }) {
  return( 
    <StateContext>
  <Layout>
   <Toaster/> 
  <Component {...pageProps} />
  </Layout>
  </StateContext>
)}

export default MyApp

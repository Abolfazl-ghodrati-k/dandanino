import React from 'react'
import CheckoutWizard from '../../components/CheckoutWizard'
import Layout from '../../components/Layout'

function index() {
  return (
    <Layout>
        <CheckoutWizard activeStep={3}/>
    </Layout>
  )
}

export default index
import React from 'react'
import './App.css'
import Nav from '../nav'
import AddOrderPage from '../pages/add-order-page/AddOrderPage'
import { Router } from '@reach/router'
import SearchPage from '../pages/search-page'
import OrderPage from '../pages/order-page/OrderPage'

function App() {
  return (
    <>
      <Nav />
      <div className="container">
        <Router>
          <AddOrderPage path="/" />
          <SearchPage path="/search" />
          <OrderPage path="/clients/:clientId/orders/:orderId" />
        </Router>
      </div>
    </>
  )
}

export default App

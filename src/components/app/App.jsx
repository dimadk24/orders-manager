import React from 'react'
import './App.css'
import Nav from '../nav'
import AddOrderPage from '../pages/add-order-page/AddOrderPage'
import { Router } from '@reach/router'
import SearchPage from '../pages/search-page'

function App() {
  return (
    <>
      <Nav />
      <div className="container">
        <Router>
          <AddOrderPage path="/" />
          <SearchPage path="/search" />
        </Router>
      </div>
    </>
  )
}

export default App

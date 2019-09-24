import React from 'react'
import './App.css'
import Nav from '../nav'
import ConnectedAddOrderPage from '../pages/add-order-page'
import { Router } from '@reach/router'
import SearchPage from '../pages/search-page'

function App() {
  return (
    <>
      <Nav />
      <div className="container">
        <Router>
          <ConnectedAddOrderPage path="/" />
          <SearchPage path="/search" />
        </Router>
      </div>
    </>
  )
}

export default App

import React from 'react'
import './App.css'
import Nav from '../nav'
import ConnectedAddOrderPage from '../pages/add-order-page'
import { Router } from '@reach/router'

function App() {
  return (
    <>
      <Nav />
      <div className="container">
        <Router>
          <ConnectedAddOrderPage path="/" />
        </Router>
      </div>
    </>
  )
}

export default App

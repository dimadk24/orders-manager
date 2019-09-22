import React from 'react'
import './App.css'
import Nav from '../nav'
import ConnectedAddOrderPage from '../pages/add-order-page'

function App() {
  return (
    <>
      <Nav />
      <div className="container">
        <ConnectedAddOrderPage />
      </div>
    </>
  )
}

export default App

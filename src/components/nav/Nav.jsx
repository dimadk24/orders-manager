import React from 'react'
import './Nav.css'
import '../../assets/fontello/css/fontello.css'
import Button from '../button'

function Nav() {
  return (
    <nav className="nav" id="nav">
      <Button className="btn-menu-toggle">
        <i className="icon-menu" />
      </Button>
      <ul className="menu">
        <li>
          <a href="/add_order">Добавить заказ</a>
        </li>
      </ul>
    </nav>
  )
}

export default Nav

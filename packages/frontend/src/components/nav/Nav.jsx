import React from 'react'
import './Nav.css'
import '../../assets/fontello/css/fontello.css'
import Button from '../button'
import { Link } from '@reach/router'

function Nav() {
  return (
    <nav className="nav" id="nav">
      <Button className="btn-menu-toggle">
        <i className="icon-menu" />
      </Button>
      <ul className="menu">
        <li>
          <Link to="/">Добавить заказ</Link>
        </li>
        <li>
          <Link to="/search">Поиск</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav

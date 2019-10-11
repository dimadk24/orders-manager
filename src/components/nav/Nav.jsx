import React from 'react'
import './Nav.css'
import { Link as RouterLink } from '@reach/router'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Link from '@material-ui/core/Link'

function Nav() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          className="btn-menu-toggle"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        {/*<Typography variant="h6" className="menu-link">*/}
          <Link component={RouterLink} to="/">
            Добавить заказ
          </Link>
        {/*</Typography>*/}
        <Typography variant="h6" className="menu-link">
          <Link to="/search">Поиск</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Nav

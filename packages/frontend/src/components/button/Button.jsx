import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './Button.css'

const Button = ({ children, className: additionalClasses, ...other }) => {
  const classes = classNames('button', additionalClasses)
  return (
    <button type="button" className={classes} {...other}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

Button.defaultProps = {
  className: '',
}

export default Button

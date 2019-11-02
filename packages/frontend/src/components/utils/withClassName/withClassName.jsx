import React from 'react'

const withClassName = (Component, className) => {
  const WithClassName = (props) => (
    <Component className={className} {...props} />
  )
  WithClassName.displayName = 'WithClassName'
  return WithClassName
}

export default withClassName

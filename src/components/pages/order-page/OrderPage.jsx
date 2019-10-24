import React from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line no-unused-vars
const OrderPage = ({ clientId, orderId }) => {
  // will be used later for fetching person data
  return <div />
}

OrderPage.propTypes = {
  clientId: PropTypes.string,
  orderId: PropTypes.string,
}

OrderPage.defaultProps = {
  clientId: '',
  orderId: '',
}

export default OrderPage

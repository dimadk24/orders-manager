import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { getFullApiUrl } from '../../../utils'
import Order from '../../order/Order'
import Loader from '../../utils/Loader/Loader'
import { deserializeOrder } from '../add-order-page/addOrderPage_service'

// eslint-disable-next-line no-unused-vars
const OrderPage = ({ clientId, orderId }) => {
  const [loaded, setLoaded] = useState(false)
  const [formInitialValues, setFormInitialValues] = useState()
  useEffect(() => {
    const loadOrderData = async () => {
      const response = await axios.post(getFullApiUrl('get-order'), {
        id: +orderId,
      })
      setFormInitialValues(deserializeOrder(response.data))
      setLoaded(true)
    }
    loadOrderData()
  }, [orderId])
  return loaded ? (
    <Order formInitialValues={formInitialValues} idFieldLabel="Заказ №" />
  ) : (
    <Loader />
  )
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

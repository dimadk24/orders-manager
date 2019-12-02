import axios from 'axios'
import { getFullApiUrl } from '../../../utils'
import moment from 'moment'

const getOrder = async (searchId) => {
  const url = getFullApiUrl('get-order')
  const response = await axios.post(url, { id: +searchId })
  return response.data
}

const getDateOrder = (order) => {
  return {
    ...order,
    orderTimestamp: moment().millisecond(order.orderTimestamp),
    deliveryDateTimestamp: moment().millisecond(order.deliveryDateTimestamp),
  }
}

export { getOrder, getDateOrder }

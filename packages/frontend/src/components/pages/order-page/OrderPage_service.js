import axios from 'axios'
import { getFullApiUrl } from '../../../utils'

const serializeOrder = (order) => {
  return {
    ...order,
    orderTimestamp: order.orderTimestamp.unix(),
    deliveryDateTimestamp: order.deliveryDateTimestamp.unix(),
  }
}

const saveOrder = async (order) => {
  const serializedOrder = serializeOrder(order)
  const saveOrderUrl = getFullApiUrl('create-order')
  return axios.post(saveOrderUrl, serializedOrder)
}

const getOrdersCount = async () => {
  const url = getFullApiUrl('get-orders-count')
  const response = await axios.get(url)
  return response.data.count
}

export { saveOrder, serializeOrder, getOrdersCount }

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

export { saveOrder, serializeOrder }

import axios from 'axios'

const serializeOrder = (order) => {
  return {
    ...order,
    orderTimestamp: order.orderTimestamp.unix(),
    deliveryDateTimestamp: order.deliveryDateTimestamp.unix(),
  }
}

const saveOrder = async (order) => {
  const serializedOrder = serializeOrder(order)
  const baseBackendUrl = process.env.REACT_APP_BASE_BACKEND_URL
  const saveOrderUrl = `${baseBackendUrl}/create-order`
  return axios.post(saveOrderUrl, serializedOrder)
}

export { saveOrder, serializeOrder }

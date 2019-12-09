import axios from 'axios'
import { getFullApiUrl } from '../../../utils'

const getOrder = async (searchId) => {
  const url = getFullApiUrl('get-order')
  const response = await axios.post(url, { id: +searchId })
  return response.data
}

const findOrders = async (searchData) => {
  if (searchData.id) {
    Object.assign(searchData, { id: +searchData.id })
  }
  const url = getFullApiUrl('search-orders')
  const response = await axios.post(url, { filters: searchData })
  return response.data.orders
}

export { getOrder, findOrders }

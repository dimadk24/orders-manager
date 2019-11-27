import axios from 'axios'
import { getFullApiUrl } from '../../../utils'

const getOrder = async (searchId) => {
  const url = getFullApiUrl('get-order')
  const response = await axios.post(url, { id: +searchId })
  return response.data
}

export default getOrder

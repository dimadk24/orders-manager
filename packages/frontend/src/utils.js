import removeTrailingSeparator from 'remove-trailing-separator'

const isProductionMode = process.env.NODE_ENV === 'production'

const BASE_BACKEND_URL = removeTrailingSeparator(
  process.env.REACT_APP_BASE_BACKEND_URL
)
const getFullApiUrl = (relativeUrl) =>
  `${BASE_BACKEND_URL}/${removeTrailingSeparator(relativeUrl)}`

export { isProductionMode, getFullApiUrl }

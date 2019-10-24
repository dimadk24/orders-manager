import { OPTIONS_MODES } from './product_constants'

const getProductArrayIndex = (products, id) => {
  return products.findIndex((product) => product.id === id)
}

const getMaximumProductId = (products) => {
  if (!products.length) {
    return 0
  }
  const ids = products.map((product) => product.id)
  return Math.max(...ids)
}

const getOptionsMode = (product) => {
  return product.type.id === 0 ? OPTIONS_MODES.TYPES : OPTIONS_MODES.PARAMETERS
}

const createProductName = ({ type, parameters }) => {
  const parametersValues = parameters.map((parameter) => parameter.value)
  return `${type.value} ${parametersValues.join(' ')}`.trim()
}

export {
  getProductArrayIndex,
  getMaximumProductId,
  getOptionsMode,
  createProductName,
}

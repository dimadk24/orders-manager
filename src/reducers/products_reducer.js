import { ADD_PRODUCT, REMOVE_PRODUCT, CHOOSE_PRODUCT_TYPE } from '../actions'
import {
  createProduct,
  mockProductParameters,
  mockProductTypes,
  OPTIONS_MODES,
} from '../models/product_model'

const initialState = {
  items: [createProduct({ id: 1 })],
  types: mockProductTypes,
  parameters: mockProductParameters,
}

function getMaximumProductId(products) {
  if (!products.length) {
    return 0
  }
  const ids = products.map((product) => product.id)
  return Math.max(...ids)
}

function itemsReducer(state = initialState.items, action) {
  switch (action.type) {
    case ADD_PRODUCT: {
      const newProductId = getMaximumProductId(state) + 1
      return [...state, createProduct({ id: newProductId })]
    }
    case REMOVE_PRODUCT:
      return state.filter(({ id }) => id !== action.payload.id)
    default:
      return state
  }
}

function chooseTypeReducer(state = initialState.items, action) {
  return state.map((product) => {
    if (product.id === action.payload.productId) {
      return {
        ...product,
        type: action.payload.productType,
        optionsMode: OPTIONS_MODES.PARAMETERS,
      }
    }
    return product
  })
}

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
    case REMOVE_PRODUCT: {
      return { ...state, items: itemsReducer(state.items, action) }
    }
    case CHOOSE_PRODUCT_TYPE: {
      return {
        ...state,
        items: chooseTypeReducer(state.items, action),
      }
    }
    default:
      return state
  }
}

export { getMaximumProductId, itemsReducer, chooseTypeReducer }

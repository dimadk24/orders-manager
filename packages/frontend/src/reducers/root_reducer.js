import { combineReducers } from 'redux'
import productsReducer from './products_reducer'

const rootReducer = combineReducers({ products: productsReducer })

export default rootReducer

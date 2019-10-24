import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers/root_reducer'
import isProductionMode from './utils'

function configureStore() {
  const store = createStore(rootReducer, composeWithDevTools())

  if (!isProductionMode && module.hot) {
    module.hot.accept('./reducers/root_reducer.js', () => {
      store.replaceReducer(rootReducer)
    })
  }

  return store
}

export default configureStore

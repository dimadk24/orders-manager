import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import ConnectedApp from './components/app'
import * as serviceWorker from './serviceWorker'
import configureStore from './configureStore'
import isProductionMode from './utils'

const store = configureStore()

const rootElement = document.getElementById('root')

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedApp />
    </Provider>,
    rootElement
  )
}

render()

if (!isProductionMode && module.hot) {
  module.hot.accept('./components/app', render)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

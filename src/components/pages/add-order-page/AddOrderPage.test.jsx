import React from 'react'
import ReactDOM from 'react-dom'
import AddOrderPage from './AddOrderPage'

describe('AddOrderPage', () => {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const defaultProps = {
    onRemoveProduct: () => {},
    onAddProduct: () => {},
    products: [],
  }

  function render(props = {}) {
    const localProps = {
      ...defaultProps,
      ...props,
    }
    ReactDOM.render(<AddOrderPage {...localProps} />, container)
  }

  afterEach(() => ReactDOM.unmountComponentAtNode(container))

  it('renders without crashing', () => {
    render()
  })
})

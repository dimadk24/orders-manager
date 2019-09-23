import React from 'react'
import ReactDOM from 'react-dom'
import { AddOrderPage } from './AddOrderPage'

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

  function querySelectorAll(...params) {
    return container.querySelectorAll(...params)
  }

  afterEach(() => ReactDOM.unmountComponentAtNode(container))

  it('renders without crashing', () => {
    render()
  })

  it('renders 0 products', () => {
    render({
      products: [],
    })
    expect(querySelectorAll('.products > *')).toHaveLength(0)
  })

  it(
    'calls addProduct callback on click on add product button ' +
      'without arguments',
    () => {
      const onAddProduct = jest.fn()
      render({
        onAddProduct,
      })

      const addProductButton = querySelectorAll('.btn-add-product')[0]
      addProductButton.click()

      expect(onAddProduct).toHaveBeenCalledWith()
    }
  )
})

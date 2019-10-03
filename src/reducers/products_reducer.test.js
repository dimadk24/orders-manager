import {
  chooseTypeReducer,
  getMaximumProductId,
  itemsReducer,
} from './products_reducer'
import { addProduct, chooseProductType, removeProduct } from '../actions'
import createProduct, { OPTIONS_MODES } from '../models/product_model'

const createMockProduct = (id) => createProduct({ id })

describe('itemsReducer', () => {
  it('handles addProduct action', () => {
    const actual = itemsReducer([createMockProduct(1)], addProduct())
    const expected = [createMockProduct(1), createMockProduct(2)]
    expect(actual).toEqual(expected)
  })

  it('handles addProduct action with complex state', () => {
    const state = [createMockProduct(1), createMockProduct(3)]
    const actual = itemsReducer(state, addProduct())
    const expected = [
      createMockProduct(1),
      createMockProduct(3),
      createMockProduct(4),
    ]
    expect(actual).toEqual(expected)
  })

  it('handles removeProduct action', () => {
    const state = [createMockProduct(1), createMockProduct(2)]
    const actual = itemsReducer(state, removeProduct(1))
    const expected = [createMockProduct(2)]
    expect(actual).toEqual(expected)
  })

  it('handles removeProduct action 2', () => {
    const state = [
      createMockProduct(1),
      createMockProduct(2),
      createMockProduct(5),
    ]
    const actual = itemsReducer(state, removeProduct(2))
    const expected = [createMockProduct(1), createMockProduct(5)]
    expect(actual).toEqual(expected)
  })
})

describe('chooseTypeReducer', () => {
  it('handles chooseProductType action on simple state', () => {
    const state = [createMockProduct(1)]
    const actual = chooseTypeReducer(
      state,
      chooseProductType(1, { id: 1, value: 'test' })
    )
    const expected = [
      createProduct({
        id: 1,
        optionsMode: OPTIONS_MODES.PARAMETERS,
        type: { id: 1, value: 'test' },
      }),
    ]
    expect(actual).toEqual(expected)
  })

  it('handles chooseProductType action on complex state', () => {
    const state = [
      createMockProduct(1),
      createMockProduct(5),
      createMockProduct(10),
    ]
    const actual = chooseTypeReducer(
      state,
      chooseProductType(5, { id: 1, value: 'jest' })
    )
    const expected = [
      createMockProduct(1),
      createProduct({
        id: 5,
        optionsMode: OPTIONS_MODES.PARAMETERS,
        type: { id: 1, value: 'jest' },
      }),
      createMockProduct(10),
    ]
    expect(actual).toEqual(expected)
  })
})

describe('getMaximumProductId', () => {
  it('returns 0 if array of products is empty', () => {
    expect(getMaximumProductId([])).toBe(0)
  })

  it('returns maximum product id for 1 product', () => {
    expect(getMaximumProductId([createMockProduct(1)])).toBe(1)
  })

  it('returns maximum product id for 2 products', () => {
    const products = [createMockProduct(10), createMockProduct(20)]
    expect(getMaximumProductId(products)).toBe(20)
  })

  it('returns maximum product id for 5 products', () => {
    const products = [
      createMockProduct(2),
      createMockProduct(10),
      createMockProduct(13),
      createMockProduct(50),
      createMockProduct(100),
    ]
    expect(getMaximumProductId(products)).toBe(100)
  })
})

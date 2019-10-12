import createProduct, { OPTIONS_MODES } from '../models/product_model'
import { selectOptionsMode } from './product_selectors'

describe.skip('selectOptionsMode', () => {
  it('selects options mode 1', () => {
    const state = {
      products: {
        items: [
          createProduct({ id: 1, optionsMode: OPTIONS_MODES.TYPES }),
          createProduct({ id: 2, optionsMode: OPTIONS_MODES.PARAMETERS }),
        ],
      },
    }
    expect(selectOptionsMode(state, 1)).toBe(OPTIONS_MODES.TYPES)
  })

  it('selects options mode 2', () => {
    const state = {
      products: {
        items: [
          createProduct({ id: 10, optionsMode: OPTIONS_MODES.PARAMETERS }),
          createProduct({ id: 5, optionsMode: OPTIONS_MODES.TYPES }),
        ],
      },
    }
    expect(selectOptionsMode(state, 5)).toBe(OPTIONS_MODES.TYPES)
  })
})

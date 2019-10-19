import {
  createProductName,
  getMaximumProductId,
  getProductArrayIndex,
} from './product_utils'

describe('getProductArrayIndex', () => {
  let products

  beforeEach(() => {
    products = [{ id: 1 }, { id: 10 }]
  })

  it('finds product index in array', () => {
    expect(getProductArrayIndex(products, 10)).toBe(1)
  })

  it('returns -1 when product id was not found', () => {
    expect(getProductArrayIndex(products, 23)).toBe(-1)
  })

  it('returns -1 on empty products array', () => {
    expect(getProductArrayIndex([], 1)).toBe(-1)
  })
})

describe('getMaximumProductId', () => {
  it('returns max id on 2 products', () => {
    const products = [{ id: 5 }, { id: 10 }]
    expect(getMaximumProductId(products)).toBe(10)
  })

  it('returns max id on 5 unsorted products', () => {
    const products = [{ id: 1 }, { id: 10 }, { id: 5 }, { id: 15 }, { id: 12 }]
    expect(getMaximumProductId(products)).toBe(15)
  })

  it('returns max id on array of 1 product', () => {
    const products = [{ id: 2 }]
    expect(getMaximumProductId(products)).toBe(2)
  })

  it('returns 0 on empty array', () => {
    expect(getMaximumProductId([])).toBe(0)
  })
})

describe('createProductName', () => {
  it('returns empty string initially', () => {
    expect(createProductName({ type: { value: '' }, parameters: [] })).toBe('')
  })

  it('returns product type when no parameters are set', () => {
    const type = {
      value: 'some test type',
    }
    expect(createProductName({ type, parameters: [] })).toBe('some test type')
  })

  it('combines parameters when no type is set', () => {
    const parameters = [{ value: 'param 1' }, { value: 'param 2' }]
    const actual = createProductName({ type: { value: '' }, parameters })
    expect(actual).toBe('param 1 param 2')
  })

  it('combines type and parameters when both are set', () => {
    const type = {
      value: 'pretty blanket',
    }
    const parameters = [
      {
        value: 'small',
      },
      {
        value: 'cute',
      },
      {
        value: 'fluffy',
      },
    ]
    const expectedName = 'pretty blanket small cute fluffy'
    expect(createProductName({ type, parameters })).toBe(expectedName)
  })
})

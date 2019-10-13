const OPTIONS_MODES = {
  TYPES: 'types',
  PARAMETERS: 'parameters',
}

const createProduct = ({ id }) => ({
  id,
  name: '',
  type: {
    id: 0,
    value: '',
  },
  purchasePrice: 0,
  price: 0,
  amount: 1,
  comment: '',
  parameters: [],
})

const getProductArrayIndex = (products, id) => {
  return products.findIndex((product) => product.id === id)
}

function getMaximumProductId(products) {
  if (!products.length) {
    return 0
  }
  const ids = products.map((product) => product.id)
  return Math.max(...ids)
}

const getOptionsMode = (product) => {
  return product.type.id === 0 ? OPTIONS_MODES.TYPES : OPTIONS_MODES.PARAMETERS
}

const mockProductTypes = [
  { id: 1, value: 'одеяло' },
  { id: 2, value: 'подушка' },
  { id: 3, value: 'постельное бельё' },
  { id: 4, value: 'простыня на резинке' },
  { id: 5, value: 'наматрасник' },
  { id: 6, value: 'плед' },
  { id: 7, value: 'полотенце' },
]

const mockProductParameters = [
  {
    name: 'размер',
    options: [
      {
        text: 'M',
        value: 'M',
      },
      {
        text: 'L',
        value: 'L',
      },
    ],
  },
  {
    name: 'материал',
    options: [
      {
        text: 'хлопок',
        value: 'хлопок',
      },
      {
        text: 'шелк',
        value: 'шелк',
      },
    ],
  },
  {
    name: 'производитель',
    options: [
      {
        text: 'беларусь',
        value: 'беларусь',
      },
    ],
  },
  {
    name: 'плотность',
    options: [
      {
        text: 'плотный',
        value: 'плотный',
      },
    ],
  },
  {
    name: 'тип',
    options: [
      {
        text: 'важный',
        value: 'важный',
      },
    ],
  },
]

export {
  createProduct,
  getProductArrayIndex,
  getMaximumProductId,
  getOptionsMode,
  mockProductTypes,
  mockProductParameters,
  OPTIONS_MODES,
}

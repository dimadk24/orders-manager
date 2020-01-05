const { createLambda } = require('./middlewares')
const { getMongoClient } = require('./utils')

const EMPTY_OPTION = {
  value: '',
  text: 'Выбрать',
}

const mockProductParameters = [
  {
    name: 'size',
    label: 'размер',
    value: '',
    options: [
      EMPTY_OPTION,
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
    name: 'material',
    label: 'материал',
    value: '',
    options: [
      EMPTY_OPTION,
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
    name: 'manufacturer',
    label: 'производитель',
    value: '',
    options: [
      EMPTY_OPTION,
      {
        text: 'беларусь',
        value: 'беларусь',
      },
    ],
  },
  {
    name: 'thickness',
    label: 'плотность',
    value: '',
    options: [
      EMPTY_OPTION,
      {
        text: 'плотный',
        value: 'плотный',
      },
    ],
  },
  {
    name: 'type',
    label: 'тип',
    value: '',
    options: [
      EMPTY_OPTION,
      {
        text: 'важный',
        value: 'важный',
      },
    ],
  },
]

const handler = createLambda(async (event) => {
  const { id } = event.body
  const client = await getMongoClient()
  const db = client.db()
  const collection = db.collection('orders')
  const order = await collection.findOne({ id })
  order.products = order.products.map((product) => {
    const parameters = product.parameters.map(({ name, value }) => {
      const parameter = mockProductParameters.find(
        (param) => param.name === name
      )
      return {
        ...parameter,
        value,
      }
    })
    return {
      ...product,
      parameters,
    }
  })
  // eslint-disable-next-line no-underscore-dangle
  delete order._id
  return order
})

module.exports = {
  handler,
}

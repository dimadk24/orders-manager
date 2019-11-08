const { createLambda } = require('./middlewares')

const createOrder = createLambda(async (event) => {
  return {
    message: 'Hello world!',
    input: event,
  }
})

module.exports = { createOrder }

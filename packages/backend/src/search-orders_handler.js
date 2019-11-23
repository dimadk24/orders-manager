const { createLambda } = require('./middlewares')
const { findOrders } = require('./orders-logic')

const handler = createLambda(async (event) => {
  const orders = await findOrders(event.body.filters)
  return { orders }
})

module.exports = { handler }

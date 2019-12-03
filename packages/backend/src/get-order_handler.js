const { createLambda } = require('./middlewares')
const { getMongoClient } = require('./utils')

const handler = createLambda(async (event) => {
  const { id } = event.body
  const client = await getMongoClient()
  const db = client.db()
  const collection = db.collection('orders')
  const order = await collection.findOne({ id })
  // eslint-disable-next-line no-underscore-dangle
  delete order._id
  return order
})

module.exports = {
  handler,
}

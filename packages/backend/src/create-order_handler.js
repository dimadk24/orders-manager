const { getMongoClient } = require('./utils')
const { createLambda } = require('./middlewares')

module.exports.handler = createLambda(async (event) => {
  const orderData = event.body
  const mongoClient = await getMongoClient()
  await mongoClient
    .db()
    .collection('orders')
    .insertOne(orderData)
  return {
    id: orderData.id,
  }
})

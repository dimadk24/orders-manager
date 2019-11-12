const { createLambda } = require('./middlewares')
const { getMongoClient } = require('./utils')

const handler = createLambda(async () => {
  const client = await getMongoClient()
  const db = client.db()
  const collection = db.collection('orders')
  return {
    count: await collection.estimatedDocumentCount(),
  }
})

module.exports = {
  handler,
}

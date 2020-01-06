const { getMongoClient } = require('./utils')
const { createLambda } = require('./middlewares')

module.exports.handler = createLambda(async (event) => {
  const { value } = event.body
  const mongoClient = await getMongoClient()
  const db = mongoClient.db()
  const collection = db.collection('productTypes')
  const id = (await collection.estimatedDocumentCount()) + 1
  collection.insertOne({
    id,
    value,
  })
  const currentDocument = await collection.findOne({ id })
  // eslint-disable-next-line no-underscore-dangle
  delete currentDocument._id
  return currentDocument
})

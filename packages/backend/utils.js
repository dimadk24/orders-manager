const { MongoClient } = require('mongodb')

const getEnvironment = () => process.env

let mongoClient

const createMongoClient = async () => {
  const { DB_CONNECT_URL } = getEnvironment()
  mongoClient = new MongoClient(DB_CONNECT_URL)
  await mongoClient.connect()
}

const getMongoClient = async () => {
  if (!mongoClient) await createMongoClient()
  mongoClient.db()
  return mongoClient
}

module.exports = { getEnvironment, getMongoClient }

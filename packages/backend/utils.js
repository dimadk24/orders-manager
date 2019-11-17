const { MongoClient } = require('mongodb')
const config = require('./config')
const matcher = require('matcher')

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

const isAllowedOrigin = (origin) => {
  const { allowedOrigins } = config
  return Boolean(matcher([origin], allowedOrigins).length)
}

module.exports = { getEnvironment, getMongoClient, isAllowedOrigin }

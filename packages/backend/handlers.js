const { MongoClient } = require('mongodb')
const { getEnvironment } = require('./utils')
const { createLambda } = require('./middlewares')

const index = createLambda(async () => ({
  headers: {
    'content-type': 'text/html; charset=UTF-8',
  },
  body: `Hello World, orders manager backend. Basic logic works!<br/>
Please also verify, that I can connect to database,
visit <a href="./test-db">this url</a>`,
}))

const testDatabase = createLambda(async () => {
  const { DB_CONNECT_URL } = getEnvironment()
  const client = new MongoClient(DB_CONNECT_URL)
  let successful
  let errorStack
  try {
    await client.connect()
    client.db()
    successful = true
  } catch (err) {
    errorStack = err.stack
    console.log(errorStack)
    successful = false
  }
  await client.close()
  return `Hello MongoDB! ${
    successful
      ? 'It works!'
      : `It didn't work :(, here is error log:\n\n${errorStack}`
  }`
})

const createOrder = createLambda(async (event) => {
  return {
    message: 'Hello world!',
    input: event,
  }
})

module.exports = { index, testDatabase, createOrder }

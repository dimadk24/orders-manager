const { MongoClient } = require('mongodb')
const { getEnvironment } = require('lazy-universal-dotenv')

const index = async () => ({
  statusCode: 200,
  body: 'Hello World, orders manager backend. It works!',
})

const testDatabase = async () => {
  const environment = getEnvironment().raw
  const client = new MongoClient(environment.DB_CONNECT_URL)
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
  return {
    statusCode: 200,
    body: `Hello MongoDB! ${
      successful
        ? 'It works!'
        : `It didn't work :(, here is error log:\n\n${errorStack}`
    }`,
  }
}

const createOrder = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hello world!',
        input: event,
      },
      null,
      2
    ),
  }
}

module.exports = { index, testDatabase, createOrder }

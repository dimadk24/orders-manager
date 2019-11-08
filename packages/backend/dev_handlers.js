const { getMongoClient } = require('./utils')
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
  let successful
  let errorStack
  try {
    await getMongoClient()
    successful = true
  } catch (err) {
    errorStack = err.stack
    console.log(errorStack)
    successful = false
  }
  return `Hello MongoDB! ${
    successful
      ? 'It works!'
      : `It didn't work :(, here is error log:\n\n${errorStack}`
  }`
})

module.exports = {
  index,
  testDatabase,
}

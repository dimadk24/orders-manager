const { createLambda } = require('./middlewares')

module.exports.handler = createLambda(async (event) => ({
  message: 'Hello world!',
  input: event,
}))

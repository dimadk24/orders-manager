const { compose, recoveryMiddleware } = require('serverless-compose')

const waitForEmptyEventLoopMiddleware = (next) => (event, context) => {
  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false
  return next(event, context)
}

const errorMiddleware = recoveryMiddleware((error) => {
  console.error(error)
  return {
    statusCode: 500,
    body: JSON.stringify({ error: true, message: 'internal server error' }),
  }
})

const createLambda = compose(
  waitForEmptyEventLoopMiddleware,
  errorMiddleware
)

module.exports = { createLambda }

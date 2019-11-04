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
    body: { error: true, message: 'internal server error' },
  }
})

const stringifyJSONMiddleware = (next) => async (event, context) => {
  const response = await next(event, context)
  const bodyType = typeof response.body
  if (bodyType === 'object') {
    response.body = JSON.stringify(response.body)
  } else if (bodyType !== 'string') {
    throw new Error(`unsupported response.body type ${bodyType}`)
  }
  return response
}

const createLambda = compose(
  waitForEmptyEventLoopMiddleware,
  stringifyJSONMiddleware,
  errorMiddleware
)

module.exports = { createLambda }

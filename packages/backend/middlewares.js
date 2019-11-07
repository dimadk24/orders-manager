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

const convertBodyMiddleware = (next) => async (event, context) => {
  const response = await next(event, context)
  if (response.body === undefined) {
    return {
      body: response,
    }
  }
  return response
}

const addDefaultStatusCodeMiddleware = (next) => async (event, context) => {
  const response = await next(event, context)
  if (typeof response.statusCode === 'undefined') {
    response.statusCode = 200
  }
  return response
}

const throwOnFalsyResponseMiddleware = (next) => async (event, context) => {
  const response = await next(event, context)
  if (response === undefined || response === null) {
    throw new Error(`expected response from function not to be "${response}"`)
  }
  return response
}

const createLambda = compose(
  waitForEmptyEventLoopMiddleware,
  addDefaultStatusCodeMiddleware,
  stringifyJSONMiddleware,
  errorMiddleware,
  convertBodyMiddleware,
  throwOnFalsyResponseMiddleware
)

module.exports = { createLambda }

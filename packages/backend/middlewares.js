const type = require('type-detect')
const { isAllowedOrigin } = require('./utils')
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
    body: {
      error: true,
      message: 'internal server error, view console logs for details',
    },
  }
})

const corsHeadersMiddleware = (next) => async (event, context) => {
  const response = await next(event, context)
  if (!event.headers) return response
  const { origin } = event.headers
  if (isAllowedOrigin(origin))
    response.headers = {
      ...response.headers,
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': true,
    }
  return response
}

const parseJSONRequestBodyMiddleware = (next) => async (event, context) => {
  try {
    const parsedBody = JSON.parse(event.body)
    // JSON.parse('null') === null, JSON.parse('true') === true
    if (type(parsedBody) === 'Object') {
      // eslint-disable-next-line no-param-reassign
      event.body = parsedBody
    }
  } catch (e) {} // eslint-disable-line no-empty
  return next(event, context)
}

const stringifyJSONResponseMiddleware = (next) => async (event, context) => {
  const response = await next(event, context)
  const { body } = response
  const bodyType = type(body)
  if (bodyType === 'Object') {
    response.body = JSON.stringify(body)
  } else if (bodyType !== 'string') {
    throw new Error(`unsupported response.body type: ${bodyType}`)
  }
  return response
}

const convertResponseBodyMiddleware = (next) => async (event, context) => {
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
  if (type(response.statusCode) === 'undefined') {
    response.statusCode = 200
  }
  return response
}

const throwOnFalsyResponseMiddleware = (next) => async (event, context) => {
  const response = await next(event, context)
  if (response === undefined || response === null) {
    let message = `expected response from function not to be "${response}"`
    if (response === undefined) {
      message += `, please check that you return something in your function :)`
    }
    throw new Error(message)
  }
  return response
}

const createLambda = compose(
  waitForEmptyEventLoopMiddleware,
  addDefaultStatusCodeMiddleware,
  corsHeadersMiddleware,
  stringifyJSONResponseMiddleware,
  errorMiddleware,
  convertResponseBodyMiddleware,
  throwOnFalsyResponseMiddleware,
  parseJSONRequestBodyMiddleware
)

module.exports = {
  createLambda,
  waitForEmptyEventLoopMiddleware,
  errorMiddleware,
  stringifyJSONResponseMiddleware,
  addDefaultStatusCodeMiddleware,
  convertResponseBodyMiddleware,
  throwOnFalsyResponseMiddleware,
  parseJSONRequestBodyMiddleware,
}

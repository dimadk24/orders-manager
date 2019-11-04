const getEnvironment = () => process.env

const createLambda = (handler) => (event, context) => {
  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false
  return handler(event, context)
}

module.exports = { getEnvironment, createLambda }

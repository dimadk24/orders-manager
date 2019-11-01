const index = async () => ({
  statusCode: 200,
  body: 'Hello World, orders manager backend. It works!',
})

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

module.exports = { index, createOrder }

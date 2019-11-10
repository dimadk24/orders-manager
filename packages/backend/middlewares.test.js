const {
  errorMiddleware,
  stringifyJSONResponseMiddleware,
  convertResponseBodyMiddleware,
  addDefaultStatusCodeMiddleware,
  throwOnFalsyResponseMiddleware,
  createLambda,
} = require('./middlewares')

const callHandler = (handler, event = {}, context = {}) =>
  handler(event, context)

const INTERNAL_SERVER_ERROR_RESPONSE = {
  statusCode: 500,
  body: `{"error":true,"message":"internal server error, view console logs for details"}`, // eslint-disable-line max-len
}

const KIND_RETURNED_UNDEFINED_ERROR =
  'please check that you return something in your function'

const originalConsoleError = console.error

describe('errorMiddleware', () => {
  afterEach(() => {
    console.error = originalConsoleError
  })

  it('returns 500 if handler throws error', async () => {
    const handler = async () => {
      throw new Error('test')
    }
    const wrappedHandler = errorMiddleware(handler)
    console.error = jest.fn()

    const response = await wrappedHandler()

    expect(response.statusCode).toBe(500)
    expect(response.body.error).toBe(true)
    expect(console.error).toHaveBeenCalled()
  })

  it('does nothing if handler does not throw error', async () => {
    const handler = async () => ({
      statusCode: 200,
      body: { ok: true },
    })
    const wrappedHandler = errorMiddleware(handler)
    console.error = jest.fn()

    const response = await wrappedHandler()

    expect(response.statusCode).toBe(200)
    expect(response.body.error).toBe(undefined)
    expect(console.error).not.toHaveBeenCalled()
  })
})

describe('stringifyJSONResponseMiddleware', () => {
  it('stringifies response.body if it is object', async () => {
    const handler = async () => ({
      body: { ok: true, items: [1, 2, 3, 4] },
    })
    const wrappedHandler = stringifyJSONResponseMiddleware(handler)

    const response = await wrappedHandler()

    expect(response.body).toBe('{"ok":true,"items":[1,2,3,4]}')
  })

  it('throws error if response.body is neither object nor string', async () => {
    expect.hasAssertions()
    const handler = async () => ({
      body: [1, 2, 3],
    })
    const wrappedHandler = stringifyJSONResponseMiddleware(handler)

    try {
      await wrappedHandler()
    } catch (e) {
      expect(e).toEqual(expect.any(Error))
      expect(e.message).toContain('Array')
    }
  })
})

describe('convertResponseBodyMiddleware', () => {
  it('converts body, allows just return body in lambda function', async () => {
    const handler = async () => ({ ok: true })
    const wrappedHandler = convertResponseBodyMiddleware(handler)

    expect(await wrappedHandler()).toEqual({ body: { ok: true } })
  })
})

describe('addDefaultStatusCodeMiddleware', () => {
  it("adds 200 statusCode if handler doesn't specify statusCode", async () => {
    const handler = async () => ({ body: { ok: true } })
    const wrappedHandler = addDefaultStatusCodeMiddleware(handler)

    const response = await wrappedHandler()

    expect(response).toEqual({ statusCode: 200, body: { ok: true } })
  })

  it('does nothing if handler specifies status code', async () => {
    const handler = async () => ({ statusCode: 401 })
    const wrappedHandler = addDefaultStatusCodeMiddleware(handler)

    const response = await wrappedHandler()

    expect(response).toEqual({ statusCode: 401 })
  })
})

describe('throwOnFalsyResponseMiddleware', () => {
  it('throws if response is null', async () => {
    expect.hasAssertions()
    const handler = async () => null
    const wrappedHandler = throwOnFalsyResponseMiddleware(handler)

    try {
      await wrappedHandler()
    } catch (e) {
      expect(e).toEqual(expect.any(Error))
      expect(e.message).toContain('null')
    }
  })

  it('kindly throws if response is undefined', async () => {
    expect.hasAssertions()
    const handler = async () => undefined
    const wrappedHandler = throwOnFalsyResponseMiddleware(handler)

    try {
      await wrappedHandler()
    } catch (e) {
      expect(e).toEqual(expect.any(Error))
      expect(e.message).toContain('undefined')
      expect(e.message).toContain(KIND_RETURNED_UNDEFINED_ERROR)
    }
  })
})

describe('createLambda', () => {
  it('allows just to return response body in handler', async () => {
    const handler = async () => ({ ok: true })
    const wrappedHandler = createLambda(handler)

    const response = await callHandler(wrappedHandler)

    expect(response).toEqual({ statusCode: 200, body: '{"ok":true}' })
  })

  it('returns 500 statusCode and log error if handler thrown', async () => {
    console.error = jest.fn()
    const handler = async () => {
      throw new Error('test')
    }
    const wrappedHandler = createLambda(handler)

    const response = await callHandler(wrappedHandler)

    expect(response).toEqual(INTERNAL_SERVER_ERROR_RESPONSE)
    expect(console.error).toHaveBeenCalled()
    console.error = originalConsoleError
  })

  it('allows to set statusCode in handler', async () => {
    const handler = async () => ({ statusCode: 401, body: { ok: false } })
    const wrappedHandler = createLambda(handler)

    const response = await callHandler(wrappedHandler)

    expect(response).toEqual({
      statusCode: 401,
      body: '{"ok":false}',
    })
  })

  it('kindly throws if handler returned undefined', async () => {
    console.error = jest.fn()
    const handler = async () => undefined
    const wrappedHandler = createLambda(handler)

    const response = await callHandler(wrappedHandler)

    expect(response).toEqual(INTERNAL_SERVER_ERROR_RESPONSE)
    expect(console.error).toHaveBeenCalled()
    const loggedErrorMessage = console.error.mock.calls[0][0].message
    expect(loggedErrorMessage).toContain(KIND_RETURNED_UNDEFINED_ERROR)
    console.error = originalConsoleError
  })

  it('allows to set headers', async () => {
    const handler = async () => ({
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
      body: { ok: true },
    })
    const wrappedHandler = createLambda(handler)

    const response = await callHandler(wrappedHandler)

    expect(response).toEqual({
      statusCode: 200,
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
      body: '{"ok":true}',
    })
  })

  it('allows to return string html response', async () => {
    const handler = async () => ({
      headers: {
        'content-type': 'text/html; charset=UTF-8',
      },
      body: 'test',
    })
    const wrappedHandler = createLambda(handler)

    const response = await callHandler(wrappedHandler)

    expect(response).toEqual({
      statusCode: 200,
      headers: {
        'content-type': 'text/html; charset=UTF-8',
      },
      body: 'test',
    })
  })
})

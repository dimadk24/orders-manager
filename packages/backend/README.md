# Orders-manager backend

## What can you return from Lambda function?

We have some handy middlewares that reduce duplication in handlers.
They run JSON.stringify on response.body and add default (200 OK) status code,
so you don't have to.

Firstly import main middleware (wrapper for all handlers):

```javascript
const { createLambda } = require('./middlewares')
```

You can just return response as JavaScript object from your handler
and it will just work:

```javascript
const handler = createLambda(async (event, context) => {
  return {
    items: [{ id: 1 }, { id: 2 }],
  }
})
```

In most cases that's all you need.

If you need to change statusCode, you can use following handler format:

```javascript
const handler = createLambda(async (event, context) => {
  return {
    statusCode: 401,
    body: { error: true, message: 'not authorized' },
  }
})
```

response.body still will be converted via JSON.stringify.

You can set headers the same way as status code.
Please note, headers field should be an object:

```javascript
const handler = createLambda(async (event, context) => {
  return {
    statusCode: 401,
    headers: {
      Date: 'Thu, 07 Nov 2019 13:47:28 GMT',
    },
    body: { error: true, message: 'not authorized' },
  }
})
```

Also, you can just return string from your function:

```javascript
const handler = createLambda(async (event, context) => {
  return 'not authorized'
})
```

Or this way:

```javascript
const handler = createLambda(async (event, context) => {
  return {
    statusCode: 401,
    body: 'not authorized',
  }
})
```

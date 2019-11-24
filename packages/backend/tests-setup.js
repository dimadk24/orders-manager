// const path = require('path')
// const dotenv = require('dotenv')
const { MongoMemoryServer } = require('mongodb-memory-server-global')

async function createMockServer() {
  const mongoServer = new MongoMemoryServer({ binary: { version: '4.0.13' } })

  console.log(mongoServer.getInstanceInfo())
  process.env.DB_CONNECT_URL = await mongoServer.getConnectionString()
  console.log(process.env.DB_CONNECT_URL)
}

// const dotenvPath = path.resolve(process.cwd(), '.env.test.local')
// dotenv.config({ path: dotenvPath })

module.exports = async function globalTestsSetup() {
  await createMockServer()
}

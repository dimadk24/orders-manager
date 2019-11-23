const path = require('path')
const dotenv = require('dotenv')

const dotenvPath = path.resolve(process.cwd(), '.env')
dotenv.config({ path: dotenvPath })
process.env.DB_CONNECT_URL = process.env.TEST_DB_CONNECT_URL

const path = require('path')
const dotenv = require('dotenv')

const dotenvPath = path.resolve(process.cwd(), '.env.test.local')
dotenv.config({ path: dotenvPath })

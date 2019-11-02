const {
  getEnvironment: dotenvGetEnvironment,
} = require('lazy-universal-dotenv')

const getEnvironment = () => dotenvGetEnvironment().raw

module.exports = { getEnvironment }

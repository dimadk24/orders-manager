const escapeStringRegexp = require('escape-string-regexp')

class QueryUtils {
  static includes(property, value) {
    if (!value) return {}
    const regexFilter = new RegExp(escapeStringRegexp(value), 'i')
    return {
      [property]: regexFilter,
    }
  }
}

module.exports = QueryUtils

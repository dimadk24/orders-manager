class QueryUtils {
  static includes(property, value) {
    if (!value) return {}
    const regexFilter = new RegExp(value, 'i')
    return {
      [property]: regexFilter,
    }
  }
}

module.exports = QueryUtils

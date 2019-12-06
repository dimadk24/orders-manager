const QueryUtils = require('./query-utils')
const { getMongoClient } = require('./utils')

async function findOrders(filters) {
  const client = await getMongoClient()
  const queryFilters = []
  if (filters.id) {
    queryFilters.push({
      id: filters.id,
    })
  }
  if (filters.phone) {
    queryFilters.push({
      $or: [
        QueryUtils.includes('mainPhone', filters.phone),
        QueryUtils.includes('additionalPhone', filters.phone),
      ],
    })
  }
  if (filters.city)
    queryFilters.push(QueryUtils.includes('address.city', filters.city))
  if (filters.streetName)
    queryFilters.push(
      QueryUtils.includes('address.streetName', filters.streetName)
    )
  if (filters.house) {
    queryFilters.push({ 'address.house': filters.house })
  }
  return client
    .db()
    .collection('orders')
    .find(
      {
        $and: queryFilters,
      },
      { limit: 50 }
    )
    .toArray()
}

module.exports = { findOrders }

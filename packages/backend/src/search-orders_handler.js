const { createLambda } = require('./middlewares')
const { getMongoClient } = require('./utils')
const QueryUtils = require('./query-utils')

const handler = createLambda(async (event) => {
  const { filters } = event.body
  const client = await getMongoClient()
  const queryFilters = []
  if (filters.id)
    queryFilters.push({
      id: filters.id,
    })
  if (filters.phone) {
    queryFilters.push({
      $or: [
        QueryUtils.includes('mainPhone', filters.phone),
        QueryUtils.includes('additionalPhone', filters.phone),
      ],
    })
  }
  if (filters.city) queryFilters.push(QueryUtils.includes('city', filters.city))
  if (filters.street)
    queryFilters.push(QueryUtils.includes('street', filters.street))
  if (filters.house)
    queryFilters.push(QueryUtils.includes('house', filters.house))
  const orders = await client
    .db()
    .collection('orders')
    .find(
      {
        $and: queryFilters,
      },
      { limit: 50 }
    )
    .toArray()
  return { orders }
})

module.exports = { handler }

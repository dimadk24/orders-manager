const { getMongoClient } = require('./utils')
const { findOrders } = require('./orders-logic')

describe('orders-logic', () => {
  let client

  const insertOrders = async (orders) => {
    await client
      .db()
      .collection('orders')
      .insertMany(orders)
  }

  beforeAll(async () => {
    client = await getMongoClient()
  })

  afterEach(async () => {
    await client.db().dropDatabase()
  })

  describe('findOrders', () => {
    it('finds orders by id', async () => {
      await insertOrders([
        {
          id: 1,
          value: 'first',
        },
        {
          id: 2,
          value: 'second',
        },
        {
          id: 11,
        },
      ])

      const foundItems = await findOrders({ id: 1 })

      expect(foundItems).toHaveLength(1)
      expect(foundItems[0].id).toEqual(1)
      expect(foundItems[0].value).toEqual('first')
    })

    it('finds orders by city case insensitively', async () => {
      await insertOrders([
        {
          address: { city: 'Minsk' },
        },
        {
          address: { city: 'minsk main' },
        },
        {
          address: { city: 'main Minsk' },
        },
        {
          address: { city: 'Gomel' },
        },
        {
          address: { city: 'Mensk' },
        },
        {
          id: 1,
        },
        {
          address: { city: '' },
        },
        {
          address: { city: undefined },
        },
      ])

      const foundItems = await findOrders({ city: 'Minsk' })

      expect(foundItems).toHaveLength(3)
      expect(foundItems[0]).toEqual(
        expect.objectContaining({ address: { city: 'Minsk' } })
      )
      expect(foundItems[1]).toEqual(
        expect.objectContaining({ address: { city: 'minsk main' } })
      )
      expect(foundItems[2]).toEqual(
        expect.objectContaining({ address: { city: 'main Minsk' } })
      )
    })

    it('find orders by street case insensitively', async () => {
      await insertOrders([
        {
          address: { street: 'Nemiga' },
        },
        {
          address: { street: 'nemiga str.' },
        },
        {
          address: { street: 'str. Nemiga' },
        },
        {
          id: 1,
        },
        {
          address: { street: 'golodeda' },
        },
        {
          address: { street: 'Nemigo' },
        },
      ])

      const foundItems = await findOrders({ street: 'nemiga' })

      expect(foundItems).toHaveLength(3)
      expect(foundItems[0]).toEqual(
        expect.objectContaining({ address: { street: 'Nemiga' } })
      )
      expect(foundItems[1]).toEqual(
        expect.objectContaining({ address: { street: 'nemiga str.' } })
      )
      expect(foundItems[2]).toEqual(
        expect.objectContaining({ address: { street: 'str. Nemiga' } })
      )
    })

    it('finds orders by house', async () => {
      await insertOrders([
        {
          address: {
            house: '2',
          },
        },
        {
          address: {
            house: '3',
          },
        },
        {
          address: {
            house: '20',
          },
        },
        {
          id: 1,
        },
      ])

      const foundItems = await findOrders({ house: '2' })

      expect(foundItems).toHaveLength(1)
      expect(foundItems[0]).toEqual(
        expect.objectContaining({ address: { house: '2' } })
      )
    })

    it('finds orders by id and street', async () => {
      await insertOrders([
        {
          id: 1,
          address: {
            street: 'Nemiga',
          },
        },
        {
          id: 1,
          address: {
            street: 'Golodeda',
          },
        },
        {
          id: 10,
          address: {
            street: 'Nemiga',
          },
        },
      ])

      const foundItems = await findOrders({ street: 'nemiga', id: 1 })

      expect(foundItems).toHaveLength(1)
      expect(foundItems[0]).toEqual(
        expect.objectContaining({
          id: 1,
          address: {
            street: 'Nemiga',
          },
        })
      )
    })
  })
})

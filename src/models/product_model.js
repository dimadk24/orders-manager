const createProduct = ({ id }) => ({
  id,
  type: {
    id: 0,
    value: '',
  },
  purchasePrice: 0,
  price: 0,
  amount: 1,
  comment: '',
  parameters: [],
})

export default createProduct

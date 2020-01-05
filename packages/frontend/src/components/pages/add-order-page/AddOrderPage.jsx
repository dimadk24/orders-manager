import React from 'react'
import './AddOrderPage.css'
import createProduct from '../../../models/product_model'
import moment from 'moment'
import Order from '../../order/Order'

const AddOrderPage = () => {
  const formInitialValues = {
    products: [createProduct({ id: 1 })],
    id: 0,
    orderTimestamp: moment(),
    deliveryDateTimestamp: moment(),
    deliveryTime: '',
    mainPhone: '',
    additionalPhone: '',
    address: {
      index: '',
      district: '',
      city: '',
      streetType: 'ул',
      streetName: '',
      house: '',
      building: '',
      flat: '',
      floor: '',
      entrance: '',
    },
    comment: '',
  }
  return (
    <Order
      formInitialValues={formInitialValues}
      idFieldLabel="Добавить заказ №"
      canEditId
    />
  )
}

export default AddOrderPage

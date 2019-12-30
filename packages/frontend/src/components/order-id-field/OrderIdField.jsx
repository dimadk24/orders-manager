import React, { useEffect } from 'react'
import LabelledField from '../labelled-field/LabelledField'
import { useFormikContext } from 'formik'
import { getOrdersCount } from '../pages/add-order-page/addOrderPage_service'

const OrderIdField = () => {
  const { setFieldValue } = useFormikContext()
  useEffect(() => {
    const loadOrderId = async () => {
      const ordersCount = await getOrdersCount()
      const newOrderId = ordersCount + 1
      setFieldValue('id', newOrderId)
    }
    loadOrderId()
  }, [setFieldValue])
  return (
    <LabelledField
      name="id"
      label="Добавить заказ №"
      type="number"
      inputClassName="order-id-input"
      centered
    />
  )
}

export default OrderIdField

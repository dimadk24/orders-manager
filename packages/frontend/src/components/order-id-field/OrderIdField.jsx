import React, { useEffect } from 'react'
import LabelledField from '../labelled-field/LabelledField'
import { useFormikContext } from 'formik'
import { getOrdersCount } from '../pages/add-order-page/addOrderPage_service'
import PropTypes from 'prop-types'

const OrderIdField = ({ label }) => {
  const { setFieldValue, values } = useFormikContext()
  useEffect(() => {
    const loadOrderId = async () => {
      const ordersCount = await getOrdersCount()
      const newOrderId = ordersCount + 1
      setFieldValue('id', newOrderId)
    }
    if (!values.id) loadOrderId()
  }, [setFieldValue, values.id])
  return (
    <LabelledField
      name="id"
      label={label}
      type="number"
      inputClassName="order-id-input"
      centered
    />
  )
}

OrderIdField.propTypes = {
  label: PropTypes.string,
}

OrderIdField.defaultProps = {
  label: '',
}

export default OrderIdField

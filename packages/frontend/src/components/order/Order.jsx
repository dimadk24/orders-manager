import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FieldArray, Form, Formik } from 'formik'
import { saveOrder } from '../pages/add-order-page/addOrderPage_service'
import OrderIdField from '../order-id-field/OrderIdField'
import Loader from '../utils/Loader/Loader'
import Button from '../button'
import OrderData from '../order-data'
import createProduct from '../../models/product_model'
import {
  getMaximumProductId,
  getOptionsMode,
  getProductArrayIndex,
} from '../../models/product_utils'
import Product from '../product/Product'
import { mockProductTypes } from '../../models/product_constants'

/* eslint-disable react/prop-types */
const getProductsBlock = ({ products, setFieldValue, isLoading }) => (
  <FieldArray name="products">
    {({ push, remove }) => {
      const onAddProduct = () => {
        const newProduct = createProduct({
          id: getMaximumProductId(products) + 1,
        })
        push(newProduct)
      }

      const onRemoveProduct = (productId) =>
        remove(getProductArrayIndex(products, productId))

      const onChooseProductType = ({ productIndex, typeId, value }) => {
        const fieldName = `products[${productIndex}].type`
        setFieldValue(fieldName, { id: typeId, value })
      }

      return (
        <>
          <div className="products">
            {products.map((product, index) => {
              return (
                <Product
                  key={product.id}
                  index={index}
                  types={mockProductTypes}
                  optionsMode={getOptionsMode(product)}
                  onRemove={() => onRemoveProduct(product.id)}
                  onChooseProductType={({ id: typeId, value }) =>
                    onChooseProductType({
                      productIndex: index,
                      typeId,
                      value,
                    })
                  }
                />
              )
            })}
          </div>
          <Button
            className="btn-add-product"
            onClick={() => onAddProduct()}
            disabled={isLoading}
          >
            +
          </Button>
        </>
      )
    }}
  </FieldArray>
)
/* eslint-enable react/prop-types */

const Order = ({ formInitialValues, idFieldLabel, canEditId }) => {
  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={async (values, actions) => {
        await saveOrder(values)
        alert('saved') // eslint-disable-line no-alert
        actions.setSubmitting(false)
      }}
    >
      {({
        values,
        setFieldValue,
        handleSubmit,
        isSubmitting,
        isValidating,
      }) => {
        const isLoading = isSubmitting && !isValidating
        return (
          <>
            <h1 className="order-id-wrapper">
              <OrderIdField label={idFieldLabel} editable={canEditId} />
            </h1>
            <main>
              <Form className="form-wrapper">
                <section className="main-content-wrapper">
                  {getProductsBlock({
                    products: values.products,
                    setFieldValue,
                    isLoading,
                  })}
                  {isLoading && <Loader />}
                  <Button
                    className="btn-save-order"
                    onClick={handleSubmit}
                    type="submit"
                    disabled={isLoading}
                  >
                    Сохранить заказ
                  </Button>
                </section>
                <aside>
                  <OrderData />
                </aside>
              </Form>
            </main>
          </>
        )
      }}
    </Formik>
  )
}

Order.propTypes = {
  formInitialValues: PropTypes.shape({
    products: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired,
    orderTimestamp: PropTypes.instanceOf(moment).isRequired,
    deliveryDateTimestamp: PropTypes.instanceOf(moment).isRequired,
    deliveryTime: PropTypes.string.isRequired,
    mainPhone: PropTypes.string.isRequired,
    additionalPhone: PropTypes.string.isRequired,
    address: PropTypes.shape({
      index: PropTypes.string.isRequired,
      district: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      streetType: PropTypes.string.isRequired,
      streetName: PropTypes.string.isRequired,
      house: PropTypes.string.isRequired,
      building: PropTypes.string.isRequired,
      flat: PropTypes.string.isRequired,
      floor: PropTypes.string.isRequired,
      entrance: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  idFieldLabel: PropTypes.string,
  canEditId: PropTypes.bool,
}

Order.defaultProps = {
  idFieldLabel: '',
  canEditId: true,
}

export default Order

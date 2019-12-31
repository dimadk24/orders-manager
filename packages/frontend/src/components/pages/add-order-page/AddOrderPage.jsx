import React from 'react'
import Product from '../../product/Product'
import Button from '../../button'
import OrderData from '../../order-data'
import './AddOrderPage.css'
import { FieldArray, Form, Formik } from 'formik'
import createProduct from '../../../models/product_model'
import {
  getMaximumProductId,
  getOptionsMode,
  getProductArrayIndex,
} from '../../../models/product_utils'
import { mockProductTypes } from '../../../models/product_constants'
import moment from 'moment'
import { saveOrder } from './addOrderPage_service'
import Loader from '../../utils/Loader/Loader'
import OrderIdField from '../../order-id-field/OrderIdField'

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
              <OrderIdField />
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

AddOrderPage.propTypes = {}

export default AddOrderPage

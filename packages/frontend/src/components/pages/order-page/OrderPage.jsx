import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import Product from '../../product/Product'
import Button from '../../button'
import OrderData from '../../order-data'
import './OrderPage.css'
import { FieldArray, Form, Formik } from 'formik'
import createProduct from '../../../models/product_model'
import {
  getMaximumProductId,
  getOptionsMode,
  getProductArrayIndex,
} from '../../../models/product_utils'
import {
  mockProductParameters,
  mockProductTypes,
} from '../../../models/product_constants'
import moment from 'moment'
import LabelledField from '../../labelled-field/LabelledField'
import { saveOrder } from './OrderPage_service'
import Loader from '../../utils/Loader/Loader'
import { getOrder, getDateOrder } from '../search-page/searchPage_service'

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
      // console.log(products)
      // console.log(mockProductParameters)

      return (
        <>
          <div className="products">
            {products.map((product, index) => {
              return (
                <Product
                  key={product.id}
                  index={index}
                  types={mockProductTypes}
                  parameters={mockProductParameters}
                  products={products}
                  optionsMode={getOptionsMode(product)}
                  onRemove={() => onRemoveProduct(product.id)}
                  onChooseProductType={({ id: typeId, value }) =>
                    onChooseProductType({
                      productIndex: index,
                      typeId,
                      value,
                    })
                  }
                  formValues={product}
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

// eslint-disable-next-line no-unused-vars
const OrderPage = ({ clientId, orderId }) => {
  const [orderLoader, setOrderLoader] = useState(false)

  let formInitialValues = {
    products: [createProduct({ id: 1 })],
    id: orderId,
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

  useEffect(() => {
    async function loadOrder() {
      if (!orderLoader) {
        const getOrderObject = await getOrder(orderId)
        formInitialValues = Object.assign(
          formInitialValues,
          getOrderObject,
          getDateOrder(getOrderObject)
        )
        setOrderLoader(true)
      }
    }
    loadOrder()
  }, [])

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
              <LabelledField
                name="id"
                label="Добавить заказ №"
                type="number"
                inputClassName="order-id-input"
                centered
              />
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

OrderPage.propTypes = {
  clientId: PropTypes.string,
  orderId: PropTypes.string,
}

OrderPage.defaultProps = {
  clientId: '',
  orderId: '',
}

export default OrderPage

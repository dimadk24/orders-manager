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
import {
  mockProductParameters,
  mockProductTypes,
} from '../../../models/product_constants'
import moment from 'moment'
import LabelledField from '../../labelled-field/LabelledField'

const formInitialValues = {
  products: [createProduct({ id: 1 })],
  orderData: {
    id: 1,
    orderDate: moment(),
    deliveryDate: moment(),
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
      comment: '',
    },
  },
}

/* eslint-disable react/prop-types */
const getProductsBlock = ({ products, setFieldValue }) => (
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
                  parameters={mockProductParameters}
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
          <Button className="btn-add-product" onClick={() => onAddProduct()}>
            +
          </Button>
        </>
      )
    }}
  </FieldArray>
)
/* eslint-enable react/prop-types */

const AddOrderPage = () => (
  <Formik initialValues={formInitialValues} onSubmit={() => {}}>
    {({ values, setFieldValue }) => (
      <>
        <h1 className="order-id-wrapper">
          <LabelledField
            name="orderData.id"
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
              })}
              <Button className="btn-save-order">Сохранить заказ</Button>
            </section>
            <aside>
              <OrderData />
            </aside>
          </Form>
        </main>
      </>
    )}
  </Formik>
)

AddOrderPage.propTypes = {}

export default AddOrderPage

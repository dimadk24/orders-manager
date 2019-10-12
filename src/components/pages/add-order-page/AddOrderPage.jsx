import React from 'react'
import LabelledInput from '../../labelled-input'
import Product from '../../product/Product'
import Button from '../../button'
import OrderData from '../../order-data'
import './AddOrderPage.css'
import { FieldArray, Form, Formik } from 'formik'
import {
  createProduct,
  getMaximumProductId,
  getProductArrayIndex,
  mockProductParameters,
  mockProductTypes,
} from '../../../models/product_model'

const AddOrderPage = () => {
  const formInitialValues = {
    products: [createProduct({ id: 1 })],
  }

  const getProductsBlock = (products) => (
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

        return (
          <>
            <div className="products">
              {products.map(({ id }, index) => (
                <Product
                  key={id}
                  index={index}
                  types={mockProductTypes}
                  parameters={mockProductParameters}
                  onRemove={() => onRemoveProduct(id)}
                />
              ))}
            </div>
            <Button className="btn-add-product" onClick={() => onAddProduct()}>
              +
            </Button>
          </>
        )
      }}
    </FieldArray>
  )

  return (
    <>
      <h1 className="order-id-wrapper">
        <LabelledInput
          label="Добавить заказ №"
          type="number"
          inputClassName="order-id-input"
          centered
        />
      </h1>
      <main>
        <Formik initialValues={formInitialValues} onSubmit={() => {}}>
          {({ values }) => {
            return (
              <Form className="form-wrapper">
                <section className="main-content-wrapper">
                  {getProductsBlock(values.products)}
                  <Button className="btn-save-order">Сохранить заказ</Button>
                </section>
                <aside>
                  <OrderData />
                </aside>
              </Form>
            )
          }}
        </Formik>
      </main>
    </>
  )
}

AddOrderPage.propTypes = {}

export default AddOrderPage

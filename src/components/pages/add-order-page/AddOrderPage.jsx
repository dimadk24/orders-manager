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
  getOptionsMode,
  getProductArrayIndex,
  mockProductParameters,
  mockProductTypes,
} from '../../../models/product_model'

const AddOrderPage = () => {
  const formInitialValues = {
    products: [createProduct({ id: 1 })],
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
          {({ values, setFieldValue }) => {
            return (
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
            )
          }}
        </Formik>
      </main>
    </>
  )
}

AddOrderPage.propTypes = {}

export default AddOrderPage

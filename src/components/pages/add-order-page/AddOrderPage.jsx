import React from 'react'
import PropTypes from 'prop-types'
import LabelledInput from '../../labelled-input'
import ConnectedProduct from '../../product'
import Button from '../../button'
import OrderData from '../../order-data'
import { selectProducts } from '../../../selectors/product_selectors'
import { addProduct } from '../../../actions'
import { connect } from 'react-redux'
import './AddOrderPage.css'
import { Form, Formik } from 'formik'

const AddOrderPage = ({ products, onAddProduct }) => {
  const formInitialValues = {
    products: {
      1: {
        name: '',
        type: 0,
        purchasePrice: 0,
        price: 0,
        number: 1,
        comment: '',
        parameters: [],
      },
    },
  }
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
          <Form className="form-wrapper">
            <section className="main-content-wrapper">
              <div className="products">
                {products.map(({ id }) => (
                  <ConnectedProduct key={id} id={id} />
                ))}
              </div>
              <Button
                className="btn-add-product"
                onClick={() => onAddProduct()}
              >
                +
              </Button>
              <Button className="btn-save-order">Сохранить заказ</Button>
            </section>
            <aside>
              <OrderData />
            </aside>
          </Form>
        </Formik>
      </main>
    </>
  )
}

AddOrderPage.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  onAddProduct: PropTypes.func,
}

AddOrderPage.defaultProps = {
  products: [],
  onAddProduct: () => {},
}

const mapStateToProps = (state) => ({
  products: selectProducts(state),
})

const mapDispatchToProps = {
  onAddProduct: addProduct,
}

const ConnectedAddOrderPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrderPage)

export default ConnectedAddOrderPage

export { AddOrderPage }

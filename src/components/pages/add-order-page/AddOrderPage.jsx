import React from 'react'
import PropTypes from 'prop-types'
import LabelledInput from '../../labelled-input'
import ConnectedProduct from '../../product'
import Button from '../../button'
import CustomerData from '../../customer-data'
import { selectProducts } from '../../../selectors/product_selectors'
import { addProduct } from '../../../actions'
import { connect } from 'react-redux'

const AddOrderPage = ({ products, onAddProduct }) => {
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
        <section className="main-content-wrapper">
          <div className="products">
            {products.map(({ id }) => (
              <ConnectedProduct key={id} id={id} />
            ))}
          </div>
          <Button className="btn-add-product" onClick={() => onAddProduct()}>
            +
          </Button>
          <Button className="btn-save-order">Сохранить заказ</Button>
        </section>
        <aside>
          <CustomerData />
        </aside>
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

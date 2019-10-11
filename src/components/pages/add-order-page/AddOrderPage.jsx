import React from 'react'
import PropTypes from 'prop-types'
import LabelledInput from '../../labelled-input'
import ConnectedProduct from '../../product'
import OrderData from '../../order-data'
import { selectProducts } from '../../../selectors/product_selectors'
import { addProduct } from '../../../actions'
import { connect } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import SaveIcon from '@material-ui/icons/Save'
import './AddOrderPage.css'

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
          {/* TODO: remove Fab here */}
          <Fab onClick={() => onAddProduct()} color="secondary">
            <AddIcon />
          </Fab>
          <div className="save-button-wrapper">
            <Fab variant="extended" color="primary">
              <SaveIcon className="save-button-icon" />
              <span className="save-button-text">Сохранить заказ</span>
            </Fab>
          </div>
        </section>
        <aside>
          <OrderData />
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

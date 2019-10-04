import React from 'react'
import PropTypes from 'prop-types'
import './Product.css'
import LabelledInput from '../labelled-input'
import '../../assets/fontello/css/fontello.css'
import ProductTypeButton from './product-type-button'
import Button from '../button'
import ProductParameter from './product-parameter'
import { removeProduct, chooseProductType } from '../../actions'
import { connect } from 'react-redux'
import {
  selectMockParameters,
  selectMockTypes,
  selectOptionsMode,
} from '../../selectors/product_selectors'
import { OPTIONS_MODES } from '../../models/product_model'
import ProductOption from './product-option'

function Product({
  onRemove,
  types,
  onChooseProductType,
  optionsMode,
  parameters,
  id,
}) {
  const productFormPath = `products[${id}]`

  return (
    <section className="product">
      <div className="product__close-wrapper">
        <Button className="product__close-button" onClick={() => onRemove()}>
          <i className="icon-close" />
        </Button>
      </div>
      <LabelledInput
        label="Имя товара"
        inputClassName="product__name-input"
        disabled
        centered
      />
      <span className="product__type">Тип товара</span>
      {optionsMode === OPTIONS_MODES.TYPES && (
        <section className="product__types">
          {types.map(({ id: typeId, value }) => (
            <ProductTypeButton
              key={typeId}
              onClick={() => onChooseProductType({ id: typeId, value })}
            >
              {value}
            </ProductTypeButton>
          ))}
        </section>
      )}
      {optionsMode === OPTIONS_MODES.PARAMETERS && (
        <section className="product__parameters">
          {parameters.map((parameter) => (
            <ProductParameter
              options={parameter.options}
              label={parameter.name}
              key={parameter.name}
              labelClassName="product__parameter"
            />
          ))}
        </section>
      )}
      <ProductOption
        label="Закупочная цена товара"
        name={`${productFormPath}.purchasePrice`}
        type="number"
      />
      <ProductOption
        label="Цена товара"
        name={`${productFormPath}.price`}
        type="number"
      />
      <ProductOption
        label="Количество товаров"
        name={`${productFormPath}.number`}
        type="number"
      />
      <ProductOption
        label="Комментарий"
        name={`${productFormPath}.comment`}
        type="number"
        renderInput={() => (
          <textarea cols="30" rows="3" className="product__comment" />
        )}
      />
    </section>
  )
}

Product.propTypes = {
  id: PropTypes.number.isRequired,
  onRemove: PropTypes.func,
  types: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.required,
      value: PropTypes.string.required,
    })
  ),
  onChooseProductType: PropTypes.func,
  optionsMode: PropTypes.oneOf([OPTIONS_MODES.TYPES, OPTIONS_MODES.PARAMETERS]),
  parameters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      options: ProductParameter.propTypes.options,
    })
  ),
}

Product.defaultProps = {
  onRemove: () => {},
  types: [],
  onChooseProductType: () => {},
  optionsMode: OPTIONS_MODES.TYPES,
  parameters: [],
}

const mapStateToProps = (state, ownProps) => ({
  types: selectMockTypes(state),
  optionsMode: selectOptionsMode(state, ownProps.id),
  parameters: selectMockParameters(state),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onRemove: () => dispatch(removeProduct(ownProps.id)),
  onChooseProductType: (productType) =>
    dispatch(chooseProductType(ownProps.id, productType)),
})

const ConnectedProduct = connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)

export default ConnectedProduct
export { Product }

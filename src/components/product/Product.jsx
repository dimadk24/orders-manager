import React from 'react'
import PropTypes from 'prop-types'
import './Product.css'
import LabelledInput from '../labelled-input'
import '../../assets/fontello/css/fontello.css'
import ProductTypeButton from './product-type-button'
import Button from '../button'
import ProductParameter from './product-parameter'
import { OPTIONS_MODES } from '../../models/product_model'
import ProductOption from './product-option'
import { FieldArray } from 'formik'

function Product({
  onRemove,
  types,
  index,
  onChooseProductType,
  optionsMode,
  parameters,
  formValues,
}) {
  const productFormPath = `products[${index}]`

  const getTypesBlock = () => (
    <section className="product__types">
      {types.map(({ id, value }) => (
        <ProductTypeButton
          key={id}
          onClick={() => onChooseProductType({ id, value })}
        >
          {value}
        </ProductTypeButton>
      ))}
    </section>
  )

  const getParametersBlock = () => (
    <section className="product__parameters">
      <FieldArray name={`${productFormPath}.parameters`}>
        {({ push, replace }) => {
          const onChooseParameter = ({ name, value }) => {
            const foundItemIndex = formValues.parameters.findIndex(
              (parameter) => parameter.name === name
            )
            if (foundItemIndex === -1) push({ name, value })
            else replace(foundItemIndex, { name, value })
          }

          return parameters.map((parameter) => (
            <ProductParameter
              options={parameter.options}
              label={parameter.name}
              key={parameter.name}
              onChange={(value) =>
                onChooseParameter({ name: parameter.name, value })
              }
            />
          ))
        }}
      </FieldArray>
    </section>
  )

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
      {optionsMode === OPTIONS_MODES.TYPES && getTypesBlock()}
      {optionsMode === OPTIONS_MODES.PARAMETERS && getParametersBlock()}
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
        name={`${productFormPath}.amount`}
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
  index: PropTypes.number.isRequired,
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
  // eslint-disable-next-line react/forbid-prop-types
  formValues: PropTypes.object, // product Formik object
  // See createProduct function in product_model.js
  // and initialValues passed to Formik in the page
}

Product.defaultProps = {
  onRemove: () => {},
  types: [],
  onChooseProductType: () => {},
  optionsMode: OPTIONS_MODES.TYPES,
  parameters: [],
  formValues: {
    type: {
      id: 0,
      value: '',
    },
    parameters: [],
  },
}

export default Product

import React from 'react'
import PropTypes from 'prop-types'
import './Product.css'
import LabelledInput from '../labelled-input'
import '../../assets/fontello/css/fontello.css'
import ProductTypeButton from './product-type-button'
import Button from '../button'
import ProductParameter from './product-parameter'
import ProductOption from './product-option'
import { FieldArray, useFormikContext } from 'formik'
import { createProductName } from '../../models/product_utils'
import {
  mockProductParameters,
  OPTIONS_MODES,
} from '../../models/product_constants'

function Product({ onRemove, types, index, onChooseProductType, optionsMode }) {
  const productFormPath = `products[${index}]`
  const { setFieldValue, values } = useFormikContext()
  const productValues = values.products[index]

  const getTypesBlock = () => (
    <section className="product__types">
      {types.map(({ id, value }) => (
        <ProductTypeButton
          key={id}
          onClick={() => {
            const path = `${productFormPath}.parameters`
            setFieldValue(path, mockProductParameters)
            onChooseProductType({ id, value })
          }}
        >
          {value}
        </ProductTypeButton>
      ))}
    </section>
  )

  const getParametersBlock = () => (
    <section className="product__parameters">
      <FieldArray name={`${productFormPath}.parameters`}>
        {({ replace }) => {
          const { parameters } = productValues
          const onChooseParameter = ({ name, value }) => {
            const foundItemIndex = parameters.findIndex(
              (parameter) => parameter.name === name
            )
            if (foundItemIndex === -1)
              throw new Error('404 parameter not found')
            else {
              const foundParameter = parameters[foundItemIndex]
              replace(foundItemIndex, { ...foundParameter, value })
            }
          }

          return parameters.map((parameter) => (
            <ProductParameter
              value={parameter.value}
              options={parameter.options}
              label={parameter.label}
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
        value={createProductName({
          type: productValues.type,
          parameters: productValues.parameters,
        })}
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
        renderInput={(props) => (
          <textarea
            cols="30"
            rows="3"
            className="product__comment"
            {...props}
          />
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
  // eslint-disable-next-line react/forbid-prop-types
}

Product.defaultProps = {
  onRemove: () => {},
  types: [],
  onChooseProductType: () => {},
  optionsMode: OPTIONS_MODES.TYPES,
}

export default Product

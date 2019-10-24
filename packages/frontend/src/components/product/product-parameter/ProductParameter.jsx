import React, { useState } from 'react'
import PropTypes from 'prop-types'
import LabelledInput from '../../labelled-input'
import './ProductParameter.css'

const ProductParameter = ({ options, onChange, ...other }) => {
  const [showDefaultValue, setShowDefaultValue] = useState(true)

  const selectInput = (
    <select
      onChange={(e) => {
        setShowDefaultValue(false)
        onChange(e.target.value)
      }}
    >
      {showDefaultValue && <option value="0">Выбрать</option>}
      {options.map(({ value, text }) => {
        return (
          <option value={value} key={value}>
            {text}
          </option>
        )
      })}
    </select>
  )

  return (
    <LabelledInput
      renderInput={() => selectInput}
      labelClassName="product__parameter"
      {...other}
    />
  )
}

ProductParameter.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func,
}

ProductParameter.defaultProps = {
  onChange: () => {},
}

export default ProductParameter

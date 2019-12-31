import React from 'react'
import PropTypes from 'prop-types'
import LabelledInput from '../../labelled-input'
import './ProductParameter.css'

const ProductParameter = ({
  options,
  onChange,
  value: parameterValue,
  ...other
}) => {
  const selectInput = (
    <select onChange={(e) => onChange(e.target.value)} value={parameterValue}>
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
  value: PropTypes.string,
}

ProductParameter.defaultProps = {
  onChange: () => {},
  value: '',
}

export default ProductParameter

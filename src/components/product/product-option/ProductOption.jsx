import React from 'react'
import PropTypes from 'prop-types'
import LabelledField from '../../labelled-field/LabelledField'
import './ProductOption.css'

const ProductOption = ({ name, label, ...other }) => {
  return (
    <LabelledField
      name={name}
      label={label}
      labelClassName="product__option"
      centered
      {...other}
    />
  )
}

ProductOption.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default ProductOption

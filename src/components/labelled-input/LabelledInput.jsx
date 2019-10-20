import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './LabelledInput.css'

const LabelledInput = ({
  inputClassName,
  renderInput,
  label,
  labelClassName,
  invalid,
  centered,
  ...other
}) => {
  const labelClasses = classNames(
    'labelled-input__label',
    {
      'labelled-input__label--centered': centered,
    },
    labelClassName
  )
  const inputClasses = classNames('labelled-input__input', inputClassName, {
    'labelled-input__input--invalid': invalid,
  })
  return (
    <label className={labelClasses}>
      {label}{' '}
      {renderInput ? (
        renderInput(other)
      ) : (
        <input className={inputClasses} {...other} />
      )}
    </label>
  )
}

LabelledInput.propTypes = {
  label: PropTypes.node.isRequired,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  renderInput: PropTypes.func,
  invalid: PropTypes.bool,
  centered: PropTypes.bool,
}

LabelledInput.defaultProps = {
  labelClassName: '',
  inputClassName: '',
  renderInput: null,
  invalid: false,
  centered: false,
}

export default LabelledInput

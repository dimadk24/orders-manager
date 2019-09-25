import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './LabelledInput.css'

const LabelledInput = ({
  inputClassName,
  type,
  defaultValue,
  renderInput,
  label,
  labelClassName,
  onChange,
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
        renderInput()
      ) : (
        <input
          type={type}
          defaultValue={defaultValue}
          className={inputClasses}
          onChange={(e) => onChange(e)}
          {...other}
        />
      )}
    </label>
  )
}

LabelledInput.propTypes = {
  label: PropTypes.node.isRequired,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  renderInput: PropTypes.func,
  onChange: PropTypes.func,
  invalid: PropTypes.bool,
  centered: PropTypes.bool,
}

LabelledInput.defaultProps = {
  type: 'text',
  labelClassName: '',
  inputClassName: '',
  defaultValue: '',
  renderInput: null,
  onChange: () => {},
  invalid: false,
  centered: false,
}

export default LabelledInput

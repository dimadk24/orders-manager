import React from 'react'
import PropTypes from 'prop-types'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './LabelledPhoneInput.css'

const convertReactPhoneValueToFormikFormat = (name, value) => ({
  target: { name, value },
})

const LabelledPhoneInput = ({ name, onChange, ...props }) => {
  return (
    <PhoneInput
      onChange={(value) => {
        onChange(convertReactPhoneValueToFormikFormat(name, value))
      }}
      country="by"
      onlyCountries={['by', 'ru']}
      {...props}
    />
  )
}

LabelledPhoneInput.propTypes = {
  name: PropTypes.string.isRequired,
  // Formik name
  onChange: PropTypes.func,
}

LabelledPhoneInput.defaultProps = {
  onChange: () => {},
}

export default LabelledPhoneInput

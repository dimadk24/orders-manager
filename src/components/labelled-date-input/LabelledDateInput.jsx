import React from 'react'
import DateTime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import 'moment/locale/ru'
import './LabelledDateInput.css'
import LabelledInput from '../labelled-input'
import PropTypes from 'prop-types'

const convertReactDateTimeValueToFormikFormat = (name, value) => ({
  target: { name, value },
})

const LabelledDateInput = ({ name, ...props }) => (
  <LabelledInput
    labelClassName="labelled-date-input__label"
    renderInput={(inputProps) => (
      <DateTime
        timeFormat={false}
        inputProps={{ className: 'labelled-date-input__input' }}
        locale="ru"
        {...inputProps}
        onChange={(value) =>
          inputProps.onChange(
            convertReactDateTimeValueToFormikFormat(name, value)
          )
        }
      />
    )}
    {...props}
  />
)

LabelledDateInput.propTypes = {
  name: PropTypes.string.isRequired,
  // Formik name
  onChange: PropTypes.func,
}

LabelledDateInput.defaultProps = {
  onChange: () => {},
}

export default LabelledDateInput

import React from 'react'
import DateTime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import 'moment/locale/ru'
import './LabelledDateInput.css'
import LabelledInput from '../labelled-input'

const LabelledDateInput = (props) => (
  <LabelledInput
    labelClassName="labelled-date-input__label"
    renderInput={(inputProps) => (
      <DateTime
        timeFormat={false}
        inputProps={{ className: 'labelled-date-input__input' }}
        locale="ru"
        {...inputProps}
      />
    )}
    {...props}
  />
)

export default LabelledDateInput

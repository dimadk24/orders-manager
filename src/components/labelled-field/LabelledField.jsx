import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import LabelledInput from '../labelled-input'

const LabelledField = ({ name, ...props }) => (
  <Field name={name}>
    {({ field }) => <LabelledInput {...props} {...field} />}
  </Field>
)

LabelledField.propTypes = {
  name: PropTypes.string.isRequired,
}

export default LabelledField

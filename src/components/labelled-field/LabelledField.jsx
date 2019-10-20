import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import LabelledInput from '../labelled-input'

const LabelledField = ({ name, Component, ...props }) => (
  <Field name={name}>
    {({ field }) => <Component {...props} {...field} />}
  </Field>
)

LabelledField.propTypes = {
  name: PropTypes.string.isRequired,
  Component: PropTypes.elementType,
}

LabelledField.defaultProps = {
  Component: LabelledInput,
}

export default LabelledField

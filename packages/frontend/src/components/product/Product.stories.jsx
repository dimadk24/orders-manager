import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Product from './Product'
import { Formik } from 'formik'
import { OPTIONS_MODES } from '../../models/product_constants'

const parameters = [
  {
    name: 'размер',
    options: [
      {
        text: 'M',
        value: 'M',
      },
      {
        text: 'L',
        value: 'L',
      },
    ],
  },
  {
    name: 'материал',
    options: [
      {
        text: 'хлопок',
        value: 'хлопок',
      },
      {
        text: 'шелк',
        value: 'шелк',
      },
    ],
  },
  {
    name: 'производитель',
    options: [
      {
        text: 'беларусь',
        value: 'беларусь',
      },
    ],
  },
  {
    name: 'плотность',
    options: [
      {
        text: 'плотный',
        value: 'плотный',
      },
    ],
  },
  {
    name: 'тип',
    options: [
      {
        text: 'важный',
        value: 'важный',
      },
    ],
  },
]

const commonProps = {
  index: 1,
  onRemove: action('removed'),
}

const getComponent = (props) => {
  const localProps = {
    ...commonProps,
    ...props,
  }
  return (
    <Formik onSubmit={() => {}} initialValues={{}}>
      <Product {...localProps} />
    </Formik>
  )
}

storiesOf('Product', module)
  .add('simple', () => getComponent())
  .add('with product types', () =>
    getComponent({
      types: [{ id: 1, value: 'first' }, { id: 2, value: 'second' }],
      onChooseProductType: action('chosen product type'),
    })
  )
  .add('with few product parameters', () =>
    getComponent({
      optionsMode: OPTIONS_MODES.PARAMETERS,
      parameters: parameters.slice(0, 2),
    })
  )
  .add('with plenty product parameters', () =>
    getComponent({
      optionsMode: OPTIONS_MODES.PARAMETERS,
      parameters,
    })
  )

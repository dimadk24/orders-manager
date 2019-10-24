import React from 'react'
import { storiesOf } from '@storybook/react'
import ProductTypeButton from './ProductTypeButton'

storiesOf('ProductTypeButton', module).add('simple', () => (
  <ProductTypeButton>Super button</ProductTypeButton>
))

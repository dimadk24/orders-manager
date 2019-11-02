import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import ProductParameter from '.'

const commonProps = {
  label: 'Test',
  options: [
    { value: '1', text: 'good' },
    { value: '2', text: 'nice' },
    { value: '3', text: 'bad' },
  ],
  onChange: action('changed'),
}

const getComponent = (props) => {
  const localProps = {
    ...commonProps,
    ...props,
  }
  return <ProductParameter {...localProps} />
}

storiesOf('ProductParameter', module).add('simple', () => getComponent())

import React from 'react'
import { storiesOf } from '@storybook/react'
import OrderTable from './OrderTable'

const rows = [
  {
    id: 1,
    phone: '+375298757099',
    street: 'Немига',
  },
  {
    id: 1234,
    phone: '+375441234876',
    street: 'Победителей',
  },
]

storiesOf('OrderTable', module).add('default', () => <OrderTable rows={rows} />)

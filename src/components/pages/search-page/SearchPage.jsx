import React from 'react'
import LabelledInput from '../../labelled-input/LabelledInput'
import './SearchPage.css'
import Button from '../../button/Button'
import OrderTable from '../../order-table/OrderTable'

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

const SearchPage = () => {
  return (
    <>
      <form action="" className="search-page-form">
        <LabelledInput
          label="ID заказа"
          labelClassName="search-page-form-field"
          centered
        />
        <LabelledInput
          label="Телефон"
          labelClassName="search-page-form-field"
          centered
        />
        <LabelledInput
          label="Город"
          labelClassName="search-page-form-field"
          centered
        />
        <LabelledInput
          label="Улица"
          labelClassName="search-page-form-field"
          centered
        />
        <LabelledInput
          label="Дом"
          labelClassName="search-page-form-field"
          centered
        />
        <Button className="search-page-form-submit-button">Найти</Button>
      </form>
      <OrderTable rows={rows} />
    </>
  )
}

export default SearchPage

import React from 'react'
import LabelledInput from '../../labelled-input/LabelledInput'
import './SearchPage.css'
import Button from '../../button/Button'

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
    </>
  )
}

export default SearchPage

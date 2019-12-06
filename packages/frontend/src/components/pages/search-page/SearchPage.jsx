import './SearchPage.css'
import Button from '../../button/Button'
import OrderTable from '../../order-table/OrderTable'
import { Form, Formik } from 'formik'
import LabelledField from '../../labelled-field/LabelledField'
import { findOrders } from './searchPage_service'
import React, { useState } from 'react'

const initialFormState = {
  id: '',
  phone: '',
  city: '',
  streetName: '',
  house: '',
}

const SearchPage = () => {
  const [rows, setRows] = useState('')

  return (
    <>
      <Formik
        initialValues={initialFormState}
        onSubmit={async (values) => {
          const orders = await findOrders(values)
          setRows(orders)
        }}
      >
        {() => (
          <Form className="search-page-form">
            <LabelledField
              label="ID заказа"
              labelClassName="search-page-form-field"
              centered
              name="id"
            />
            <LabelledField
              label="Телефон"
              labelClassName="search-page-form-field"
              centered
              name="phone"
            />
            <LabelledField
              label="Город"
              labelClassName="search-page-form-field"
              centered
              name="city"
            />
            <LabelledField
              label="Улица"
              labelClassName="search-page-form-field"
              centered
              name="streetName"
            />
            <LabelledField
              label="Дом"
              labelClassName="search-page-form-field"
              centered
              name="house"
            />
            <Button className="search-page-form-submit-button" type="submit">
              Найти
            </Button>
          </Form>
        )}
      </Formik>
      {rows && <OrderTable rows={rows} />}
    </>
  )
}

export default SearchPage

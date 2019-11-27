import React from 'react'
import './SearchPage.css'
import Button from '../../button/Button'
import OrderTable from '../../order-table/OrderTable'
import { Form, Formik } from 'formik'
import LabelledField from '../../labelled-field/LabelledField'
import getOrder from './searchPage_service'

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

const initialFormState = {
  id: '',
  phone: '',
  city: '',
  streetName: '',
  house: '',
}

const SearchPage = () => {
  return (
    <>
      <Formik
        initialValues={initialFormState}
        onSubmit={async (values) => {
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(values, null, 2))
          // eslint-disable-next-line no-console
          console.log(await getOrder(values.id))
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
      <OrderTable rows={rows} />
    </>
  )
}

export default SearchPage

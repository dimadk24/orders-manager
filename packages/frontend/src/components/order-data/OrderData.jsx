import React from 'react'
import './OrderData.css'
import LabelledDateInput from '../labelled-date-input'
import LabelledField from '../labelled-field/LabelledField'
import LabelledPhoneInput from '../LabelledPhoneInput/LabelledPhoneInput'

function OrderData() {
  const addressPrefix = 'address'
  return (
    <div className="order-data">
      <LabelledField
        name="orderTimestamp"
        label="Дата заказа"
        Component={LabelledDateInput}
      />
      <LabelledField
        name="deliveryDateTimestamp"
        label="Дата доставки"
        Component={LabelledDateInput}
      />
      <LabelledField name="deliveryTime" label="Время доставки" />
      <div className="labelled-phone-input__label">
        <label htmlFor="mainPhone">Телефон</label>
        <LabelledField
          name="mainPhone"
          inputProps={{
            className: 'labelled-phone-input__input',
            id: 'mainPhone',
          }}
          Component={LabelledPhoneInput}
        />
      </div>

      <div className="labelled-phone-input__label">
        <label htmlFor="additionalPhone"> Доп. телефон</label>
        <LabelledField
          name="additionalPhone"
          inputProps={{
            className: 'labelled-phone-input__input',
            id: 'additionalPhone',
          }}
          Component={LabelledPhoneInput}
        />
      </div>

      <LabelledField
        name={`${addressPrefix}.index`}
        label="Индекс"
        type="number"
      />
      <LabelledField name={`${addressPrefix}.district`} label="Область" />
      <LabelledField name={`${addressPrefix}.city`} label="Город" />
      <LabelledField
        name={`${addressPrefix}.streetType`}
        label="Тип улицы"
        renderInput={(inputProps) => (
          <select {...inputProps}>
            <option value="ул">улица</option>
            <option value="пер">переулок</option>
            <option value="пр">проезд</option>
            <option value="бул">бульвар</option>
            <option value="пл">площадь</option>
            <option value="тр">тракт</option>
            <option value="шс">шоссе</option>
          </select>
        )}
      />
      <LabelledField name={`${addressPrefix}.streetName`} label="Улица" />
      <LabelledField name={`${addressPrefix}.house`} label="Дом" />
      <LabelledField name={`${addressPrefix}.building`} label="Корпус" />
      <LabelledField
        name={`${addressPrefix}.flat`}
        label="Квартира"
        type="number"
      />
      <LabelledField
        name={`${addressPrefix}.floor`}
        label="Этаж"
        type="number"
      />
      <LabelledField
        name={`${addressPrefix}.entrance`}
        label="Подъезд"
        type="number"
      />
      <LabelledField
        label="Комментарий"
        name="comment"
        renderInput={(props) => (
          <textarea
            id="order-comment-area"
            cols="30"
            rows="3"
            className="comment-area"
            {...props}
          />
        )}
      />
    </div>
  )
}

export default OrderData

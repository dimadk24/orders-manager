import React from 'react'
import './OrderData.css'
import LabelledDateInput from '../labelled-date-input'
import LabelledField from '../labelled-field/LabelledField'

function OrderData() {
  const formPrefix = 'orderData'
  const addressPrefix = `${formPrefix}.address`
  return (
    <div className="order-data">
      <LabelledField
        name={`${formPrefix}.orderDate`}
        label="Дата заказа"
        Component={LabelledDateInput}
      />
      <LabelledField
        name={`${formPrefix}.deliveryDate`}
        label="Дата доставки"
        Component={LabelledDateInput}
      />
      <LabelledField
        name={`${formPrefix}.deliveryTime`}
        label="Время доставки"
      />
      <LabelledField name={`${formPrefix}.mainPhone`} label="Телефон" />
      <LabelledField
        name={`${formPrefix}.additionalPhone`}
        label="Доп. телефон"
      />
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
        name={`${formPrefix}.comment`}
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

const OPTIONS_MODES = {
  TYPES: 'types',
  PARAMETERS: 'parameters',
}

const mockProductTypes = [
  { id: 1, value: 'одеяло' },
  { id: 2, value: 'подушка' },
  { id: 3, value: 'постельное бельё' },
  { id: 4, value: 'простыня на резинке' },
  { id: 5, value: 'наматрасник' },
  { id: 6, value: 'плед' },
  { id: 7, value: 'полотенце' },
]

const EMPTY_OPTION = {
  value: '',
  text: 'Выбрать',
}

const mockProductParameters = [
  {
    name: 'size',
    label: 'размер',
    value: '',
    options: [
      EMPTY_OPTION,
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
    name: 'material',
    label: 'материал',
    value: '',
    options: [
      EMPTY_OPTION,
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
    name: 'manufacturer',
    label: 'производитель',
    value: '',
    options: [
      EMPTY_OPTION,
      {
        text: 'беларусь',
        value: 'беларусь',
      },
    ],
  },
  {
    name: 'thickness',
    label: 'плотность',
    value: '',
    options: [
      EMPTY_OPTION,
      {
        text: 'плотный',
        value: 'плотный',
      },
    ],
  },
  {
    name: 'type',
    label: 'тип',
    value: '',
    options: [
      EMPTY_OPTION,
      {
        text: 'важный',
        value: 'важный',
      },
    ],
  },
]
export { mockProductParameters, mockProductTypes, OPTIONS_MODES }

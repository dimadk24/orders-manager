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

const mockProductParameters = [
  {
    name: 'размер',
    options: [
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
    name: 'материал',
    options: [
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
    name: 'производитель',
    options: [
      {
        text: 'беларусь',
        value: 'беларусь',
      },
    ],
  },
  {
    name: 'плотность',
    options: [
      {
        text: 'плотный',
        value: 'плотный',
      },
    ],
  },
  {
    name: 'тип',
    options: [
      {
        text: 'важный',
        value: 'важный',
      },
    ],
  },
]
export { mockProductParameters, mockProductTypes, OPTIONS_MODES }

# Code style of the project

## Max line length

Is 80 chars. Imports are allowed to take more than 80,
but please strive to put it in 80.

## Indentation

Indent your code with 2 spaces

## Semicolons

Project is written **without** semi-colons as they are **optional** in JavaScript
But there're some special cases, which you must be aware of.
Please read [this article](https://flaviocopes.com/javascript-automatic-semicolon-insertion/)

## Curly spacing

We put spaces after and before curly braces. Please code this way:
```js
import { name } from './module'
doStuff({ i: 1 })
```

## Quotes

use single quotes in all js and css code except jsx.
Use double quotes in jsx.
Also, use double quotes in strings with single quotes inside to prevent escaping.

Incorrect:
```jsx harmony
const simpleText = "you should have fun forever!"
const textWithEscaping = 'you shouldn\'t have any problems on the project'
const jsx = <input type='text'>
```

```css
.input[type="text"] {
  color: red;
}
```

Correct:
```jsx harmony
const simpleText = 'you should have fun forever!'
const textWithEscaping = "you shouldn't have any problems on the project"
const jsx = <input type="text">
```

```css
.input[type='text'] {
  color: red;
}
```

## JSX only in .jsx files

Please write jsx only in files with extension `jsx`

Incorrect:
```jsx harmony
// App.js

import React from 'react'

function App() {
  return <div/>
}
```

Correct:
```jsx harmony
// App.jsx

import React from 'react'

function App() {
  return <div/>
}
```

## File and folder naming

Please name directories in kebab case:
`labelled-input`, `customer-data`, `nav`

Js files, which export class or React component, should be named in Pascal case:
`App.jsx`, `CustomerData.jsx`, `LabelledInput.jsx`

All other js files should be in camel case:
`serviceWorker.js`, `index.js`

Css, scss, and sass files of React components should be named in Pascal case:
`App.css`, `CustomerData.css`, `LabelledInput.css`

All other stylesheets should be named in camel case:
`addOrder.css`, `productParameters.css`

Description of kebab, Pascal, camel and other cases can be found [here](https://stackoverflow.com/a/54330161)

## Create new React component workflow:

- Create directory `component-name` in `src/components` folder
- Create file `ComponentName.jsx`
- Create React functional or class component
- Provide prop types for this component
- \[optionally\] Create stylesheet: css or scss file `ComponentName.(css|scss)`
and import this file into component
- Export **default** ComponentName from `ComponentName.jsx `file
- Also, it's good to provide stories for your new awesome component.
Get started with storybook [here](https://storybook.js.org/)
- If you code includes any logic (except template),
please write unit tests for it. Get started with jest [here](https://jestjs.io/)

## Padding and indents in stylesheets

Put blank line between blocks in stylesheets:

Incorrect:
```css
.container {
  display: block;
}
.demo {
  color: red;
}
```

Correct:
```css
.container {
  display: block;
}

.demo {
  color: red;
}
```

Put a space between selector and opening curly brace:

Incorrect:
```css
.container{
  display: block;
}
```

Correct:
```css
.container {
  display: block;
}
```

Put opening curly brace on the same line as selector:

Incorrect:
```css
.container
{
  display: block;
}
```

Correct:
```css
.container {
  display: block;
}
```

If you have multiple selectors, put every selector on separate line:

Incorrect:
```css
.container, .demo {
  display: block;
}
```

Correct:
```css
.container,
.demo {
  display: block;
}
```

## Padding in test blocks

Put blank line between describe and it blocks in tests:

Incorrect:
```js
describe('sum', () => {
  it('sums numbers', () => {
    expect(sum(2, 2)).toBe(4)
  })
  it('sums other numbers', () => {
    expect(sum(2,3)).toBe(5)
  })
})
describe('subtract', () => {
  it('subtracts numbers', () => {
    expect(subtract(2,2)).toBe(0)
  })
})
```

Correct:
```js
describe('sum', () => {
  it('sums numbers', () => {
    expect(sum(2, 2)).toBe(4)
  })

  it('sums other numbers', () => {
    expect(sum(2,3)).toBe(5)
  })
})

describe('subtract', () => {
  it('subtracts numbers', () => {
    expect(subtract(2,2)).toBe(0)
  })
})
```

## Names of describe blocks

Please use only function or component name in describe string

Incorrect:
```js
// simple function
describe('Sum', () => {
  ...
})

describe('sum function', () => {
  ...
})

// component
describe('app component', () => {
  ...
})

describe('app', () => {
  ...
})

describe('App component', () => {
  ...
})
```

Correct:
```js
// simple function
describe('sum', () => {
  ...
})

// component
describe('App', () => {
  ...
})
```

## Names of it blocks

Do not add `should` to test names. It's just redundant.
Because of it first verb in the name should be in the 3rd form

Incorrect:
```js
it('should work', () => {
  expect(true).toBe(true)
});

it('work', () => {
  expect(true).toBe(true)
});
```

Correct:
```js
it('works', () => {
  expect(true).toBe(true)
});
```

That's all project code style rules, that we have. Enjoy!

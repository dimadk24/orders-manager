import React from 'react'
import ReactDOM from 'react-dom'
import withClassName from './withClassName'

describe('withClassName', () => {
  const container = document.createElement('div')

  // eslint-disable-next-line react/prop-types
  const SimpleComponent = (props) => <p {...props}>test content</p>

  function render({ Component, props = {} }) {
    ReactDOM.render(<Component {...props} />, container)
  }

  function getElement() {
    return container.childNodes[0]
  }

  it('passes className to the underlying component', () => {
    const EnhancedComponent = withClassName(SimpleComponent, 'test-class')
    render({ Component: EnhancedComponent })
    expect(getElement().classList).toHaveLength(1)
    expect(getElement().classList.contains('test-class')).toBe(true)
  })

  it('passes all other props to the underlying component', () => {
    const EnhancedComponent = withClassName(SimpleComponent, 'test')
    render({
      Component: EnhancedComponent,
      props: {
        id: 'test-id',
      },
    })
    expect(getElement().getAttribute('id')).toBe('test-id')
  })
})

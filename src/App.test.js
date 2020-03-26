
import React from 'react'
import { Router } from 'react-router-dom'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import  App  from './App'
import history from './history';

test('full app rendering/navigating', () => {
  const { container } = render(
    <Router history={history}>
      <App />
    </Router>
  )
  // verify page content for expected route
  expect(container.innerHTML).toMatch('Proceed to Archimydes')

  
})


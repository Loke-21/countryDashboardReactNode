import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '../pages'

test('renders loading state while fetching data', async () => {
  render(<Home />)
  expect(screen.getByText(/loading/i))
})

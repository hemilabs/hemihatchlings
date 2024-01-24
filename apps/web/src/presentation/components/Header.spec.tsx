import { describe, it, expect} from 'vitest'
import React from 'react'
import { render } from '@testing-library/react'
import Header from './Header'

describe('src/presentation/Header', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<Header />)

    expect(asFragment()).toMatchSnapshot()
  })
})

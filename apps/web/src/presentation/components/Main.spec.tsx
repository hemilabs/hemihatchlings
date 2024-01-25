import { describe, it, expect} from 'vitest'
import React from 'react'
import { render } from '@testing-library/react'
import Main from './Main'

describe('src/presentation/Main', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<Main />)

    expect(asFragment()).toMatchSnapshot()
  })
})

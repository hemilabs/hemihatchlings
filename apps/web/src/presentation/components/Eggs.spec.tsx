import { describe, it, expect} from 'vitest'
import React from 'react'
import { render } from '@testing-library/react'
import Eggs from './Eggs'

describe('src/presentation/Eggs', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<Eggs />)

    expect(asFragment()).toMatchSnapshot()
  })
})

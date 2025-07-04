import { describe, it, expect} from 'vitest'
import { render } from '@testing-library/react'
import Hero from './Hero'

describe('src/presentation/Hero', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<Hero />)

    expect(asFragment()).toMatchSnapshot()
  })
})

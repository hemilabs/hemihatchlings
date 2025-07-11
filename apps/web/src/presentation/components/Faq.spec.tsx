import { describe, it, expect} from 'vitest'
import { render } from '@testing-library/react'
import Faq from './Faq'

describe('src/presentation/Faq', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<Faq />)

    expect(asFragment()).toMatchSnapshot()
  })
})

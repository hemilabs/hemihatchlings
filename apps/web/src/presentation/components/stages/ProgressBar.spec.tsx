import { describe, it, expect} from 'vitest'
import { RenderResult, render } from '@testing-library/react'
import ProgressBar from './ProgressBar'

const renderComponent = (): RenderResult => {
    return render(
      <ProgressBar percent={50} />
    )
  }

describe('src/presentation/ProgressBar', () => {
  it('renders correctly', () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })
})

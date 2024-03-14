import { describe, it, expect} from 'vitest'
import { RenderResult, render } from '@testing-library/react'
import StatusMessage from './StatusMessage'

interface StatusMessageProps {
  stage: string
}

const renderComponent = ({ stage }:StatusMessageProps): RenderResult => {
    return render(
      <StatusMessage stage={stage} />
    )
  }

describe('src/presentation/StatusMessage', () => {
  it('renders correctly', () => {
    const { asFragment } = renderComponent({ stage: 'baby'})

    expect(asFragment()).toMatchSnapshot()
  })
})

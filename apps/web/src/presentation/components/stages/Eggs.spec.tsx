import { describe, it, expect} from 'vitest'
import { RenderResult, render } from '@testing-library/react'
import Eggs from './Eggs'

interface EggsProps {
  hatchEgg: (element: string) => void
}

const renderComponent = ({ hatchEgg }:EggsProps): RenderResult => {
    return render(
      <Eggs hatchEgg={hatchEgg} />
    )
  }

describe('src/presentation/Eggs', () => {
  it('renders correctly', () => {
    const { asFragment } = renderComponent({ hatchEgg: () => {}})

    expect(asFragment()).toMatchSnapshot()
  })
})

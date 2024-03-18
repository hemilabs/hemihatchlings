import { describe, it, expect} from 'vitest'
import { RenderResult, render } from '@testing-library/react'
import Hatchling from './Hatchling'
import { ElementEnum, StageEnum } from '@hemihatchlings/shared'

interface HatchlingProps {
  element: ElementEnum,
  stage: StageEnum
}

const renderComponent = ({ element, stage }:HatchlingProps): RenderResult => {
    return render(
      <Hatchling element={element} stage={stage} />
    )
  }

describe('src/presentation/Hatchling', () => {
  it('renders correctly', () => {
    const { asFragment } = renderComponent({
      element: ElementEnum.Fire,
      stage: StageEnum.Egg
    })

    expect(asFragment()).toMatchSnapshot()
  })
})

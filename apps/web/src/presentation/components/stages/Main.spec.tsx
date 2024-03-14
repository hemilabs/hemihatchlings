import { describe, it, expect} from 'vitest'
import { RenderResult, render } from '@testing-library/react'
import Main from './Main'
import {
  ServicesContext,
  servicesContext,
  defaultValue
} from '../../context'

const renderComponent =
  (context: ServicesContext = defaultValue): RenderResult => {
    return render(
      <servicesContext.Provider value={ context }>
        <Main />
      </servicesContext.Provider>
    )
  }

describe('src/presentation/stages/Main', () => {
  it('renders correctly', () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })
})

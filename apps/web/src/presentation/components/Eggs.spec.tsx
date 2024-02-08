import { describe, it, expect} from 'vitest'
import React from 'react'
import { RenderResult, render } from '@testing-library/react'
import Eggs from './Eggs'
import {
  ServicesContext,
  servicesContext,
  defaultValue
} from '../context'

const renderComponent =
  (context: ServicesContext = defaultValue): RenderResult => {
    return render(
      <servicesContext.Provider value={ context }>
        <Eggs />
      </servicesContext.Provider>
    )
  }

describe('src/presentation/Eggs', () => {
  it('renders correctly', () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })
})

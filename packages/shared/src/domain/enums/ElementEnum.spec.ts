import { describe, it, expect } from 'vitest'
import { ElementEnum } from './ElementEnum'

describe('src/domain/enums/ElementEnum', () => {
  it('should have a Fire with value "Fire"', () => {
    expect(ElementEnum.Fire).toBe('Fire')
  })

  it('should have an Water with value "Water"', () => {
    expect(ElementEnum.Water).toBe('Water')
  })

  it('should have a Grass with value "Grass"', () => {
    expect(ElementEnum.Grass).toBe('Grass')
  })

  it('should have a Air with value "Air"', () => {
    expect(ElementEnum.Air).toBe('Air')
  })
})

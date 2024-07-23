import { describe, it, expect } from 'vitest'
import { ElementEnum } from './ElementEnum'

describe('src/domain/enums/ElementEnum', () => {
  it('should have a Fire with value "Fire"', () => {
    expect(ElementEnum.Fire).toBe('Fire')
  })

  it('should have an Water with value "Water"', () => {
    expect(ElementEnum.Water).toBe('Water')
  })

  it('should have a Earth with value "Earth"', () => {
    expect(ElementEnum.Earth).toBe('Earth')
  })
})

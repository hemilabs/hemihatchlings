import { describe, it, expect } from 'vitest'
import { StageEnum } from './StageEnum'

describe('src/domain/enums/StageEnum', () => {
  it('should have a Egg with value "Egg"', () => {
    expect(StageEnum.Egg).toBe('Egg')
  })

  it('should have a Baby with value "Baby"', () => {
    expect(StageEnum.Baby).toBe('Baby')
  })

  it('should have an Adolescent with value "Adolescent"', () => {
    expect(StageEnum.Adolescent).toBe('Adolescent')
  })

  it('should have a Adult with value "Adult"', () => {
    expect(StageEnum.Adult).toBe('Adult')
  })
})

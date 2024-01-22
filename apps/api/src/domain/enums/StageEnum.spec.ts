import { describe, it, expect } from 'vitest'
import { StageEnum } from './StageEnum'

describe('src/domain/enums/StageEnum', () => {
  it('should have a Baby with value "baby"', () => {
    expect(StageEnum.Baby).toBe('baby')
  })

  it('should have an Adolescent with value "adolescent"', () => {
    expect(StageEnum.Adolescent).toBe('adolescent')
  })

  it('should have a Adult with value "adult"', () => {
    expect(StageEnum.Adult).toBe('adult')
  })
})

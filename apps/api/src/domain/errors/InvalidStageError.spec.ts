import { describe, it, expect } from 'vitest'
import { DomainError } from '@bitbeasties/shared'
import { InvalidStageError } from './InvalidStageError'

describe('src/domain/errors/InvalidStageError', () => {
  it('should be defined', () => {
    expect(InvalidStageError).toBeDefined()
  })

  it('should be instance of DomainError', () => {
    expect(new InvalidStageError()).toBeInstanceOf(DomainError)
  })

  describe('constructor', () => {
    it('should set error code to INVALID_STAGE', () => {
      const error = new InvalidStageError()

      expect(error.toObject().code).toBe('INVALID_STAGE')
    })

    it('should set exposable to true', () => {
      const error = new InvalidStageError()

      expect(error.toObject().exposable).toBeTruthy()
    })
  })
})

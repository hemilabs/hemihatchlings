import { describe, it, expect } from 'vitest'
import { HatchlingNotFoundError } from './HatchlingNotFoundError'
import { DomainError } from '@hemihatchlings/shared'

describe('src/domain/errors/HatchlingNotFoundError', () => {
  it('should be defined', () => {
    expect(HatchlingNotFoundError).toBeDefined()
  })

  it('should be instance of DomainError', () => {
    expect(new HatchlingNotFoundError()).toBeInstanceOf(DomainError)
  })

  describe('constructor', () => {
    it('should set error code to HATCHLING_NOT_FOUND', () => {
      const error = new HatchlingNotFoundError()

      expect(error.toObject().code).toBe('HATCHLING_NOT_FOUND')
    })

    it('should set exposable to true', () => {
      const error = new HatchlingNotFoundError()

      expect(error.toObject().exposable).toBeTruthy()
    })
  })
})

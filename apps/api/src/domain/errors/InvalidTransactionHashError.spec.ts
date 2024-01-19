import { describe, it, expect } from 'vitest'
import { DomainError } from '@bitbeasties/shared'
import { InvalidTransactionHashError } from './InvalidTransactionHashError'

describe('src/domain/errors/InvalidTransactionHashError', () => {
  it('should be defined', () => {
    expect(InvalidTransactionHashError).toBeDefined()
  })

  it('should be instance of DomainError', () => {
    expect(new InvalidTransactionHashError()).toBeInstanceOf(DomainError)
  })

  describe('constructor', () => {
    it('should set error code to INVALID_TRANSACTION_HASH', () => {
      const error = new InvalidTransactionHashError()

      expect(error.toObject().code).toBe('INVALID_TRANSACTION_HASH')
    })

    it('should set exposable to true', () => {
      const error = new InvalidTransactionHashError()

      expect(error.toObject().exposable).toBeTruthy()
    })
  })
})

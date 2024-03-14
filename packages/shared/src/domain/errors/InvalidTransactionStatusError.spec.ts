import { describe, it, expect } from 'vitest'
import { InvalidTransactionStatusError } from './InvalidTransactionStatusError'
import { DomainError } from '../base/DomainError'

describe('src/domain/errors/InvalidTransactionStatusError', () => {
  it('should be defined', () => {
    expect(InvalidTransactionStatusError).toBeDefined()
  })

  it('should be instance of DomainError', () => {
    expect(new InvalidTransactionStatusError()).toBeInstanceOf(DomainError)
  })

  describe('constructor', () => {
    it('should set error code to INVALID_TRANSACTION_STATUS', () => {
      const error = new InvalidTransactionStatusError()

      expect(error.toObject().code).toBe('INVALID_TRANSACTION_STATUS')
    })

    it('should set exposable to true', () => {
      const error = new InvalidTransactionStatusError()

      expect(error.toObject().exposable).toBeTruthy()
    })
  })
})

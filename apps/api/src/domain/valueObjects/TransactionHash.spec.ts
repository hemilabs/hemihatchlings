import { describe, it, expect } from 'vitest'
import { ValueObject } from '@hemihatchlings/shared'
import { InvalidTransactionHashError } from '../errors/InvalidTransactionHashError'
import { TransactionHash } from './TransactionHash'

describe('src/domain/valueObjects/TransactionHash', () => {
  const validTransactionHash = '0x7304dc174aab2bc487b1befb9e35ba3632b9693f0c0548e138b4401f263910f1'

  it('should be defined', () => {
    expect(TransactionHash).toBeDefined()
  })

  it('should be an instance of ValueObject', () => {
    const hash = TransactionHash.create(validTransactionHash)

    expect(hash).toBeInstanceOf(ValueObject)
  })

  describe('create', () => {
    it('should throw an error if the hash is not a string', () => {
      const test = (): void => {
        // @ts-expect-error
        TransactionHash.create(123)
      }

      expect(test).toThrowError(InvalidTransactionHashError)
    })

    it('should throw an error if the hash is not a valid', () => {
      const test = (): void => {
        TransactionHash.create('not-a-valid-hash')
      }

      expect(test).toThrowError(InvalidTransactionHashError)
    })

    it('should return a new TransactionHash instance if the hash is valid', () => {
      const hash = TransactionHash.create(validTransactionHash)

      expect(hash).toBeInstanceOf(TransactionHash)
    })

    it('should set the hash in the value property', () => {
      const expectedTransactionHash = validTransactionHash
      const hash = TransactionHash.create(expectedTransactionHash)

      expect(hash.value).toBe(expectedTransactionHash)
    })
  })
})

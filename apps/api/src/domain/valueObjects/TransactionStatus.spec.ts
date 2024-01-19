import { describe, it, expect } from 'vitest'
import { ValueObject } from '@bitbeasties/shared'
import { InvalidTransactionStatusError } from '../errors/InvalidTransactionStatusError'
import { TransactionStatus } from './TransactionStatus'
import { TransactionStatusEnum } from '../enums/TransactionStatusEnum'

describe('src/domain/valueObjects/TransactionStatus', () => {
  it('should be defined', () => {
    expect(TransactionStatus).toBeDefined()
  })

  it('should be an instance of ValueObject', () => {
    const status = TransactionStatus.create(TransactionStatusEnum.Minted)

    expect(status).toBeInstanceOf(ValueObject)
  })

  describe('create', () => {
    it('should throw an error if the status is not a string', () => {
      const test = (): void => {
        // @ts-expect-error
        TransactionStatus.create(123)
      }

      expect(test).toThrowError(InvalidTransactionStatusError)
    })

    it('should throw an error if the status is not a valid', () => {
      const test = (): void => {
        // @ts-expect-error
        TransactionStatus.create('not-a-valid-status')
      }

      expect(test).toThrowError(InvalidTransactionStatusError)
    })

    it('should return a new TransactionStatus instance if the status is valid', () => {
      const status = TransactionStatus.create(TransactionStatusEnum.EthFinality)

      expect(status).toBeInstanceOf(TransactionStatus)
    })

    it('should set the status in the value property', () => {
      const expectedTransactionStatus = TransactionStatusEnum.BtcFinality
      const status = TransactionStatus.create(expectedTransactionStatus)

      expect(status.value).toBe(expectedTransactionStatus)
    })
  })
})

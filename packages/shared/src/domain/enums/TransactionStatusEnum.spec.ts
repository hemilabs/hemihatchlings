import { describe, it, expect } from 'vitest'
import { TransactionStatusEnum } from './TransactionStatusEnum'

describe('src/domain/enums/TransactionStatusEnum', () => {
  it('should have a Minted with value "minted"', () => {
    expect(TransactionStatusEnum.Minted).toBe('Minted')
  })

  it('should have an EthFinality with value "EthFinality"', () => {
    expect(TransactionStatusEnum.EthFinality).toBe('EthFinality')
  })

  it('should have a BtcFinality with value "BtcFinality"', () => {
    expect(TransactionStatusEnum.BtcFinality).toBe('BtcFinality')
  })
})

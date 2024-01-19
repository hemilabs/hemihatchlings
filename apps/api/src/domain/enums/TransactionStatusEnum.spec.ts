import { describe, it, expect } from 'vitest'
import { TransactionStatusEnum } from './TransactionStatusEnum'

describe('src/domain/enums/TransactionStatusEnum', () => {
  it('should have a Minted with value "minted"', () => {
    expect(TransactionStatusEnum.Minted).toBe('minted')
  })

  it('should have an EthFinality with value "eth-finality"', () => {
    expect(TransactionStatusEnum.EthFinality).toBe('eth-finality')
  })

  it('should have a BtcFinality with value "btc-finality"', () => {
    expect(TransactionStatusEnum.BtcFinality).toBe('btc-finality')
  })
})

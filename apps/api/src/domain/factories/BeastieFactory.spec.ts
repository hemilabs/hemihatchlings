import { describe, it, expect } from 'vitest'
import { BeastieFactory } from './BeastieFactory'
import { Beastie } from '../entities/Beastie'
import { TransactionStatusEnum } from '../enums/TransactionStatusEnum'

describe('src/domain/factories/BeastieFactory', () => {
  it('should be defined', () => {
    expect(BeastieFactory).toBeDefined()
  })

  describe('create', () => {
    it('should return a new instance of Beastie', async () => {
      const beastie = await BeastieFactory.create({
        account: '0x52908400098527886E0F7030069857D2E4169EE7',
        transactionHash: '0x7304dc174aab2bc487b1befb9e35ba3632b9693f0c0548e138b4401f263910f1',
        transactionStatus: TransactionStatusEnum.Minted
      })

      expect(beastie).toBeInstanceOf(Beastie)
    })
  })
})

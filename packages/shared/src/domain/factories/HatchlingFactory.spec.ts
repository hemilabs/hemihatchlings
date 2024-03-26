import { describe, it, expect } from 'vitest'
import { HatchlingFactory } from './HatchlingFactory'
import { Hatchling } from '../entities/Hatchling'
import { TransactionStatusEnum } from '../enums/TransactionStatusEnum'
import { ElementEnum } from '../enums/ElementEnum'
import { StageEnum } from '../enums/StageEnum'

describe('src/domain/factories/HatchlingFactory', () => {
  it('should be defined', () => {
    expect(HatchlingFactory).toBeDefined()
  })

  describe('createWithStatus', () => {
    it('should return a new instance of Hatchling', () => {
      const hatchling = HatchlingFactory.createWithStatus({
        account: '0x52908400098527886E0F7030069857D2E4169EE7',
        transactionHash: '0x7304dc174aab2bc487b1befb9e35ba3632b9693f0c0548e138b4401f263910f1',
        transactionStatus: TransactionStatusEnum.Minted,
        element: ElementEnum.Fire
      })

      expect(hatchling).toBeInstanceOf(Hatchling)
    })

    it('should set undefined to element if none is provided', () => {
      const hatchling = HatchlingFactory.createWithStatus({
        account: '0x52908400098527886E0F7030069857D2E4169EE7',
        transactionHash: '0x7304dc174aab2bc487b1befb9e35ba3632b9693f0c0548e138b4401f263910f1',
        transactionStatus: TransactionStatusEnum.Minted
      })

      expect(hatchling.element).toBeUndefined()
    })
  })

  describe('createWithStage', () => {
    it('should return a new instance of Hatchling', () => {
      const hatchling = HatchlingFactory.createWithStage({
        account: '0x52908400098527886E0F7030069857D2E4169EE7',
        transactionHash: '0x7304dc174aab2bc487b1befb9e35ba3632b9693f0c0548e138b4401f263910f1',
        stage: StageEnum.Baby,
        element: ElementEnum.Fire
      })

      expect(hatchling).toBeInstanceOf(Hatchling)
    })

    it('should set undefined to element if none is provided', () => {
      const hatchling = HatchlingFactory.createWithStage({
        account: '0x52908400098527886E0F7030069857D2E4169EE7',
        transactionHash: '0x7304dc174aab2bc487b1befb9e35ba3632b9693f0c0548e138b4401f263910f1',
        stage: StageEnum.Baby
      })

      expect(hatchling.element).toBeUndefined()
    })
  })
})

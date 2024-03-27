import { describe, it, expect } from 'vitest'
import { Hatchling } from './Hatchling'
import { Address } from '../valueObjects/Address'
import { TransactionHash } from '../valueObjects/TransactionHash'
import { StageEnum } from '../enums/StageEnum'
import { TransactionStatus } from '../valueObjects/TransactionStatus'
import { TransactionStatusEnum } from '../enums/TransactionStatusEnum'
import { Element } from '../valueObjects/Element'
import { ElementEnum } from '../enums/ElementEnum'
import { Entity } from '../base/Entity'
import { Uuid } from '../valueObjects/Uuid'
import { Stage } from '../valueObjects/Stage'

describe('src/domain/entities/Hatchling', () => {
  const account = Address.create('0x52908400098527886E0F7030069857D2E4169EE7')
  const transactionHash = TransactionHash
    .create('0x7304dc174aab2bc487b1befb9e35ba3632b9693f0c0548e138b4401f263910f1')
  const transactionStatus = TransactionStatus.create(TransactionStatusEnum.Minted)
  const stage = Stage.create(StageEnum.Baby)
  const element = Element.create(ElementEnum.Fire)

  it('should be defined', () => {
    expect(Hatchling).toBeDefined()
  })

  it('should be an instance of Entity', () => {
    const hatchling = Hatchling.createWithStatus({
      account,
      transactionHash,
      transactionStatus,
      element
    })

    expect(hatchling).toBeInstanceOf(Entity)
  })

  describe('createWithStatus', () => {
    describe('when an id is provided as param', () => {
      it('should set the id property', () => {
        const expectedId = Uuid.create()
        const hatchling = Hatchling.createWithStatus({
          account,
          transactionHash,
          transactionStatus,
          element
        }, expectedId)

        expect(hatchling.id).toBe(expectedId)
      })
    })

    describe('when an id is NOT provided as param', () => {
      it('should generate a new id', () => {
        const hatchling = Hatchling.createWithStatus({
          account,
          transactionHash,
          transactionStatus,
          element
        })

        expect(hatchling.id).toBeInstanceOf(Uuid)
      })
    })

    it('should set the account property', () => {
      const expectedAccount = account
      const hatchling = Hatchling.createWithStatus({
        account,
        transactionHash,
        transactionStatus,
        element
      }, Uuid.create())

      expect(hatchling.account)
        .toBe(expectedAccount)
    })

    it('should set the transactionHash property', () => {
      const expectedTransactionHash = transactionHash
      const hatchling = Hatchling.createWithStatus({
        account,
        transactionHash,
        transactionStatus,
        element
      }, Uuid.create())

      expect(hatchling.transactionHash)
        .toBe(expectedTransactionHash)
    })

    it('should set the transactionStatus property', () => {
      const expectedTransactionStatus = transactionStatus
      const hatchling = Hatchling.createWithStatus({
        account,
        transactionHash,
        transactionStatus,
        element
      }, Uuid.create())

      expect(hatchling.transactionStatus)
        .toBe(expectedTransactionStatus)
    })

    it('should set the element property', () => {
      const expectedElement = element
      const hatchling = Hatchling.createWithStatus({
        account,
        transactionHash,
        transactionStatus,
        element: expectedElement
      }, Uuid.create())

      expect(hatchling.element)
        .toBe(expectedElement)
    })

    describe('when an transaction status is minted', () => {
      it('should set the Baby in the stage property', () => {
        const mintedStatus = TransactionStatus.create(TransactionStatusEnum.Minted)
        const hatchling = Hatchling.createWithStatus({
          account,
          transactionHash,
          transactionStatus: mintedStatus,
          element
        },  Uuid.create())

        expect(hatchling.stage.value).toBe(StageEnum.Baby)
      })
    })

    describe('when an transaction status is eth finality', () => {
      it('should set the Adolescent in the stage property', () => {
        const ethFinalityStatus = TransactionStatus.create(TransactionStatusEnum.EthFinality)
        const hatchling = Hatchling.createWithStatus({
          account,
          transactionHash,
          transactionStatus: ethFinalityStatus,
          element
        },  Uuid.create())

        expect(hatchling.stage.value).toBe(StageEnum.Adolescent)
      })
    })

    describe('when an transaction status is btc finality', () => {
      it('should set the Adult in the stage property', () => {
        const btcFinalityStatus = TransactionStatus.create(TransactionStatusEnum.BtcFinality)
        const hatchling = Hatchling.createWithStatus({
          account,
          transactionHash,
          transactionStatus: btcFinalityStatus,
          element
        },  Uuid.create())

        expect(hatchling.stage.value).toBe(StageEnum.Adult)
      })
    })
  })

  describe('createWithStage', () => {
    describe('when an id is provided as param', () => {
      it('should set the id property', () => {
        const expectedId = Uuid.create()
        const hatchling = Hatchling.createWithStage({
          account,
          transactionHash,
          stage,
          element
        }, expectedId)

        expect(hatchling.id).toBe(expectedId)
      })
    })

    describe('when an id is NOT provided as param', () => {
      it('should generate a new id', () => {
        const hatchling = Hatchling.createWithStage({
          account,
          transactionHash,
          stage,
          element
        })

        expect(hatchling.id).toBeInstanceOf(Uuid)
      })
    })

    it('should set the account property', () => {
      const expectedAccount = account
      const hatchling = Hatchling.createWithStage({
        account,
        transactionHash,
        stage,
        element
      }, Uuid.create())

      expect(hatchling.account)
        .toBe(expectedAccount)
    })

    it('should set the transactionHash property', () => {
      const expectedTransactionHash = transactionHash
      const hatchling = Hatchling.createWithStage({
        account,
        transactionHash,
        stage,
        element
      }, Uuid.create())

      expect(hatchling.transactionHash)
        .toBe(expectedTransactionHash)
    })

    it('should set the stage property', () => {
      const expectedStage = stage
      const hatchling = Hatchling.createWithStage({
        account,
        transactionHash,
        stage,
        element
      }, Uuid.create())

      expect(hatchling.stage)
        .toBe(expectedStage)
    })

    it('should set the element property', () => {
      const expectedElement = element
      const hatchling = Hatchling.createWithStage({
        account,
        transactionHash,
        stage,
        element: expectedElement
      }, Uuid.create())

      expect(hatchling.element)
        .toBe(expectedElement)
    })

    describe('when stage is Baby', () => {
      it('should set Minted in the transaction status property', () => {
        const babyStage = Stage.create(StageEnum.Baby)
        const hatchling = Hatchling.createWithStage({
          account,
          transactionHash,
          stage: babyStage,
          element
        },  Uuid.create())

        expect(hatchling.transactionStatus.value)
          .toBe(TransactionStatusEnum.Minted)
      })
    })

    describe('when stage is Adolescent', () => {
      it('should set the ETH finality in the transaction status property', () => {
        const adolescentStage = Stage.create(StageEnum.Adolescent)
        const hatchling = Hatchling.createWithStage({
          account,
          transactionHash,
          stage: adolescentStage,
          element
        },  Uuid.create())

        expect(hatchling.transactionStatus.value)
          .toBe(TransactionStatusEnum.EthFinality)
      })
    })

    describe('when stage is Adult', () => {
      it('should set BTC finality in the transaction status property', () => {
        const adultStage = Stage.create(StageEnum.Adult)
        const hatchling = Hatchling.createWithStage({
          account,
          transactionHash,
          stage: adultStage,
          element
        },  Uuid.create())

        expect(hatchling.transactionStatus.value)
          .toBe(TransactionStatusEnum.BtcFinality)
      })
    })
  })
})

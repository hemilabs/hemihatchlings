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

describe('src/domain/entities/Hatchling', () => {
  const account = Address.create('0x52908400098527886E0F7030069857D2E4169EE7')
  const transactionHash = TransactionHash
    .create('0x7304dc174aab2bc487b1befb9e35ba3632b9693f0c0548e138b4401f263910f1')
  const transactionStatus = TransactionStatus.create(TransactionStatusEnum.Minted)
  const element = Element.create(ElementEnum.Fire)

  it('should be defined', () => {
    expect(Hatchling).toBeDefined()
  })

  it('should be an instance of Entity', () => {
    const hatchling = Hatchling.create({
      account,
      transactionHash,
      transactionStatus,
      element
    })

    expect(hatchling).toBeInstanceOf(Entity)
  })

  describe('create', () => {
    describe('when an id is provided as param', () => {
      it('should set the id property', () => {
        const expectedId = Uuid.create()
        const hatchling = Hatchling.create({
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
        const hatchling = Hatchling.create({
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
      const hatchling = Hatchling.create({
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
      const hatchling = Hatchling.create({
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
      const hatchling = Hatchling.create({
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
      const hatchling = Hatchling.create({
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
        const hatchling = Hatchling.create({
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
        const hatchling = Hatchling.create({
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
        const hatchling = Hatchling.create({
          account,
          transactionHash,
          transactionStatus: btcFinalityStatus,
          element
        },  Uuid.create())

        expect(hatchling.stage.value).toBe(StageEnum.Adult)
      })
    })
  })
})

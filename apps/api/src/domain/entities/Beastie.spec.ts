import { describe, it, expect } from 'vitest'
import { Entity, Uuid } from '@bitbeasties/shared'
import { Beastie } from './Beastie'
import { Address } from '../valueObjects/Address'
import { TransactionHash } from '../valueObjects/TransactionHash'
import { StageEnum } from '../enums/StageEnum'
import { TransactionStatus } from '../valueObjects/TransactionStatus'
import { TransactionStatusEnum } from '../enums/TransactionStatusEnum'

describe('src/domain/entities/Beastie', () => {
  const account = Address.create('0x52908400098527886E0F7030069857D2E4169EE7')
  const transactionHash = TransactionHash
    .create('0x7304dc174aab2bc487b1befb9e35ba3632b9693f0c0548e138b4401f263910f1')
  const transactionStatus = TransactionStatus.create(TransactionStatusEnum.Minted)

  it('should be defined', () => {
    expect(Beastie).toBeDefined()
  })

  it('should be an instance of Entity', () => {
    const beastie = Beastie.create({
      account,
      transactionHash,
      transactionStatus
    })

    expect(beastie).toBeInstanceOf(Entity)
  })

  describe('create', () => {
    describe('when an id is provided as param', () => {
      it('should set the id property', () => {
        const expectedId = Uuid.create()
        const beastie = Beastie.create({
          account,
          transactionHash,
          transactionStatus
        }, expectedId)

        expect(beastie.id).toBe(expectedId)
      })
    })

    describe('when an id is NOT provided as param', () => {
      it('should generate a new id', () => {
        const beastie = Beastie.create({
          account,
          transactionHash,
          transactionStatus
        })

        expect(beastie.id).toBeInstanceOf(Uuid)
      })
    })

    it('should set the account property', () => {
      const expectedAccount = account
      const beastie = Beastie.create({
        account,
        transactionHash,
        transactionStatus
      }, Uuid.create())

      expect(beastie.account)
        .toBe(expectedAccount.value)
    })

    it('should set the transactionHash property', () => {
      const expectedTransactionHash = transactionHash
      const beastie = Beastie.create({
        account,
        transactionHash,
        transactionStatus
      }, Uuid.create())

      expect(beastie.transactionHash)
        .toBe(expectedTransactionHash.value)
    })

    it('should set the transactionStatus property', () => {
      const expectedTransactionStatus = transactionStatus
      const beastie = Beastie.create({
        account,
        transactionHash,
        transactionStatus
      }, Uuid.create())

      expect(beastie.transactionStatus)
        .toBe(expectedTransactionStatus.value)
    })

    describe('when an transaction status is minted', () => {
      it('should set the Baby in the stage property', () => {
        const mintedStatus = TransactionStatus.create(TransactionStatusEnum.Minted)
        const beastie = Beastie.create({
          account,
          transactionHash,
          transactionStatus: mintedStatus
        },  Uuid.create())

        expect(beastie.stage).toBe(StageEnum.Baby)
      })
    })

    describe('when an transaction status is eth finality', () => {
      it('should set the Adolescent in the stage property', () => {
        const ethFinalityStatus = TransactionStatus.create(TransactionStatusEnum.EthFinality)
        const beastie = Beastie.create({
          account,
          transactionHash,
          transactionStatus: ethFinalityStatus
        },  Uuid.create())

        expect(beastie.stage).toBe(StageEnum.Adolescent)
      })
    })

    describe('when an transaction status is btc finality', () => {
      it('should set the Adult in the stage property', () => {
        const btcFinalityStatus = TransactionStatus.create(TransactionStatusEnum.BtcFinality)
        const beastie = Beastie.create({
          account,
          transactionHash,
          transactionStatus: btcFinalityStatus
        },  Uuid.create())

        expect(beastie.stage).toBe(StageEnum.Adult)
      })
    })
  })
})

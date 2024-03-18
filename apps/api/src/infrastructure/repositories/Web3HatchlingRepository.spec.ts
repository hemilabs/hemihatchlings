import { describe, it, expect, vi, beforeAll } from 'vitest'
import Web3 from 'web3'
import { Web3HatchlingRepository } from './Web3HatchlingRepository'
import {
  Stage,
  StageEnum,
  TransactionHash
} from '@hemihatchlings/shared'

vi.mock('web3')

describe('src/infrastructure/repositories/Web3HatchlingRepository', () => {
  describe('constructor', () => {
    it('should add an instance of Web3 on the web3 property', () => {
      const repository = new Web3HatchlingRepository()
      expect(repository['web3']).toBeInstanceOf(Web3)
    })
  })

  describe('getStage', () => {
    const account = '0x52908400098527886E0F7030069857D2E4169EE7'
    const hash = '0x7304dc174aab2bc487b1befb9e35ba3632b9693f0c0548e138b4401f263910f1'
    const transactionHash = TransactionHash.create(hash)

    describe('when transaction was NOT found', () => {
      let result: Stage | null

      beforeAll(async () => {
        const repository = new Web3HatchlingRepository()

        repository['web3'] = {
          // @ts-ignore
          eth: {
            getTransaction: vi.fn().mockResolvedValue(null)
          }
        }

        result = await repository.getStage(transactionHash)
      })
      
      it('should return null', () => {
        expect(result).toBeNull()
      })
    })

    describe('when transaction do NOT reached ETH finality', () => {
      let result: Stage | null

      beforeAll(async () => {
        const repository = new Web3HatchlingRepository()

        repository['web3'] = {
          // @ts-ignore
          eth: {
            getTransaction: vi.fn().mockResolvedValue({
              from: account,
              blockNumber: null,
              hash
            })
          }
        }

        result = await repository.getStage(transactionHash)
      })

      it('should return the baby stage', () => {
        expect(result?.value).toBe(StageEnum.Baby)
      })
    })

    describe('when transaction reached ETH finality', () => {
      let result: Stage | null

      beforeAll(async () => {
        const repository = new Web3HatchlingRepository()

        repository['web3'] = {
          // @ts-ignore
          eth: {
            getTransaction: vi.fn().mockResolvedValue({
              from: account,
              blockNumber: 123456,
              hash
            }),
            getBlock: vi.fn().mockResolvedValue({
              timestamp: Math.floor(Date.now() /1000)
            })
          }
        }

        result = await repository.getStage(transactionHash)
      })

      it('should return a Hatchling with adolescent stage', () => {
        expect(result?.value).toBe(StageEnum.Adolescent)
      })
    })

    describe('when transaction reached BTC finality', () => {
      let result: Stage | null

      beforeAll(async () => {
        const repository = new Web3HatchlingRepository()

        /*
        This is just needed because we are
        faking the BTC finality using dates
        */
        const btcFinalityDate = new Date()
        btcFinalityDate.setMinutes(btcFinalityDate.getMinutes() - 200)

        repository['web3'] = {
          // @ts-ignore
          eth: {
            getTransaction: vi.fn().mockResolvedValue({
              from: account,
              blockNumber: 123456,
              hash
            }),
            getBlock: vi.fn().mockResolvedValue({
              timestamp: Math.floor(btcFinalityDate.getTime() /1000)
            })
          }
        }

        result = await repository.getStage(transactionHash)
      })

      it('should return a Hatchling with Adult stage', () => {
        expect(result?.value).toBe(StageEnum.Adult)
      })
    })
  })
})

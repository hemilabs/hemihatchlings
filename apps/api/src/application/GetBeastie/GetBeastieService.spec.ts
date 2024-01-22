/* eslint-disable max-statements */
import { describe, it, expect, beforeAll, vi } from 'vitest'
import { GetBeastieService } from './GetBeastieService'
import { BeastieRepository } from '../../domain/repositories/BeastieRepository'
import { GetBeastieResponseDto } from './GetBeastieDtos'
import { BeastieFactory } from '../../domain/factories/BeastieFactory'
import { BeastieNotFoundError } from '../../domain/errors/BeastieNotFoundError'
import { TransactionStatusEnum } from '../../domain/enums/TransactionStatusEnum'
import { TransactionHash } from '../../domain/valueObjects/TransactionHash'

describe('src/application/GetBeastie/GetBeastieService', () => {
  it('should be defined', () => {
    expect(GetBeastieService).toBeDefined()
  })

  describe('execute', () => {
    const account = '0x52908400098527886E0F7030069857D2E4169EE7'.toLowerCase()
    const transactionHash = '0x7304dc174aab2bc487b1befb9e35ba3632b9693f0c0548e138b4401f263910f1'
    const transactionStatus = TransactionStatusEnum.Minted
    const stage = 'baby'

    describe('when a beastie with the account and transaction hash exists', () => {
      let result: GetBeastieResponseDto

      const expectedBeastie = BeastieFactory.create({
        account, transactionHash, transactionStatus
      })
  
      const beastieRepository: BeastieRepository = {
        findByTransaction: vi.fn().mockResolvedValue(expectedBeastie)
      }

      beforeAll(async () => {
        const getBeastieService = new GetBeastieService(beastieRepository)
  
        result = await getBeastieService.execute({ account, transactionHash })
      })
  
      it('should call BeastieRepository findByTransaction method with the right params', () => {
        const beastieTransactionHash = TransactionHash.create(transactionHash)
  
        expect(beastieRepository.findByTransaction)
          .toHaveBeenCalledWith(beastieTransactionHash)
      })
  
      it('should return an instance of GetBeastieResponseDto', () => {
        expect(result).toStrictEqual({ account, transactionHash, stage })
      })
    })

    describe('when a beastie with the account and transaction hash do NOT exists', () => {
      const beastieRepository: BeastieRepository = {
        findByTransaction: vi.fn().mockResolvedValue(null)
      }

      const getBeastieService = new GetBeastieService(beastieRepository)

      it('should throw BeastieNotFound error', async () => {
        await expect(getBeastieService.execute({ account, transactionHash }))
          .rejects.toThrow(BeastieNotFoundError)
      })
    })

    describe('when a beastie have a different account from the sender', () => {
      const differentAccount = '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5'
      const beastieFromDifferentAccount = BeastieFactory.create({
        account: differentAccount,
        transactionHash,
        transactionStatus
      })

      const beastieRepository: BeastieRepository = {
        findByTransaction: vi.fn().mockResolvedValue(beastieFromDifferentAccount)
      }

      const getBeastieService = new GetBeastieService(beastieRepository)

      it('should throw BeastieNotFound error', async () => {
        await expect(getBeastieService.execute({ account, transactionHash }))
          .rejects.toThrow(BeastieNotFoundError)
      })
    })
  })
})

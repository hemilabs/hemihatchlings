/* eslint-disable max-statements */
import { describe, it, expect, beforeAll, vi } from 'vitest'
import { GetHatchlingStageService } from './GetHatchlingStageService'
import { GetHatchlingStageResponseDto } from './GetHatchlingStageDtos'
import { HatchlingRepository } from '../../domain/repositories/HatchlingRepository'
import {
  Stage,
  StageEnum,
  TransactionHash
} from '@hemihatchlings/shared'
import { HatchlingNotFoundError } from '../errors/HatchlingNotFoundError'

describe('src/application/GetHatchlingStage/GetHatchlingStageService', () => {
  it('should be defined', () => {
    expect(GetHatchlingStageService).toBeDefined()
  })

  describe('execute', () => {
    const transactionHash = '0x7304dc174aab2bc487b1befb9e35ba3632b9693f0c0548e138b4401f263910f1'
    const stage = Stage.create(StageEnum.Baby)

    describe('when a hatchling with the transaction hash exists', () => {
      let result: GetHatchlingStageResponseDto
  
      const hatchlingRepository: HatchlingRepository = {
        getStage: vi.fn().mockResolvedValue(stage)
      }

      beforeAll(async () => {
        const getHatchlingStageService = new GetHatchlingStageService(hatchlingRepository)
  
        result = await getHatchlingStageService.execute({ transactionHash })
      })
  
      it('should call HatchlingRepository getStage method with the right params', () => {
        const hash = TransactionHash.create(transactionHash)
  
        expect(hatchlingRepository.getStage)
          .toHaveBeenCalledWith(hash)
      })
  
      it('should return an instance of GetHatchlingStageResponseDto', () => {
        expect(result).toStrictEqual({ stage: stage.value })
      })
    })

    describe('when a hatchling with the transaction hash do NOT exists', () => {
      const hatchlingRepository: HatchlingRepository = {
        getStage: vi.fn().mockResolvedValue(null)
      }

      const getHatchlingStageService = new GetHatchlingStageService(hatchlingRepository)

      it('should throw HatchlingNotFound error', async () => {
        await expect(getHatchlingStageService.execute({ transactionHash }))
          .rejects.toThrow(HatchlingNotFoundError)
      })
    })
  })
})

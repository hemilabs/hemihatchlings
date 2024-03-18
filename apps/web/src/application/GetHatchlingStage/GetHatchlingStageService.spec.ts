import { describe, it, expect, vi, beforeAll } from 'vitest'
import { GetHatchlingStageService } from './GetHatchlingStageService'
import { HatchlingRepository } from '../../domain/repositories/HatchlingRepository'
import { GetHatchlingStageRequestDto, GetHatchlingStageResponseDto } from './GetHatchlingStageDtos'

describe('src/application/GetHatchlingStage/GetHatchlingStageService', () => {
  it('should be defined', () => {
    expect(GetHatchlingStageService).toBeDefined()
  })

  describe('execute', () => {
    const account = '0x52908400098527886E0F7030069857D2E4169EE7'
    const transactionHash = '0x7304dc174aab2bc487b1befb9e35ba3632b9693f0c0548e138b4401f263910f1'
    const stage = 'baby'

    let result: GetHatchlingStageResponseDto | null = null
    let expectedResult: Hatchling = { account, transactionHash, stage }

    const getHatchlingRequestDto: GetHatchlingStageRequestDto = { account, transactionHash }

    describe('when the hatchling was found with success', () => {
      const testHatchlingRepository: HatchlingRepository = {
        getStage: vi.fn().mockResolvedValue(expectedResult)
      }

      const getHatchlingService = new GetHatchlingStageService(testHatchlingRepository)

      beforeAll(async () => {
        result = await getHatchlingService.execute(getHatchlingRequestDto)
      })

      it('should call Hatchling Repository getStage method with the right params', async () => {
        expect(testHatchlingRepository.getStage)
          .toHaveBeenCalledWith(account, transactionHash)
      })

      it('should return the expected hatchling', async () => {
        expect(result).toStrictEqual(expectedResult)
      })
    })

    describe('when there is an error getStageing the hatchling', () => {
      const hatchlingFindError = new Error('Hatchling getStage error')

      const testHatchlingRepository: HatchlingRepository = {
        getStage: vi.fn().mockRejectedValue(hatchlingFindError)
      }

      const getHatchlingService = new GetHatchlingStageService(testHatchlingRepository)

      it('should call Transaction Repository create method ' +
         'with the right params', async () => {
        try {
          await getHatchlingService.execute(getHatchlingRequestDto)
        } catch (error) {
          expect(testHatchlingRepository.getStage)
            .toHaveBeenCalledWith(account, transactionHash)
        }
      })

      it('should throw the error', async () => {
        await expect(getHatchlingService.execute(getHatchlingRequestDto))
          .rejects.toStrictEqual(hatchlingFindError)
      })
    })
  })
})

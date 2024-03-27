import { describe, it, expect, vi, beforeAll } from 'vitest'
import { FindHatchlingService } from './FindHatchlingService'
import { HatchlingRepository } from '../../domain/repositories/HatchlingRepository'
import { FindHatchlingResponseDto } from './FindHatchlingDto'
import { ElementEnum, Hatchling, HatchlingFactory, StageEnum } from '@hemihatchlings/shared'

describe('src/application/FindHatchling/FindHatchlingService', () => {
  it('should be defined', () => {
    expect(FindHatchlingService).toBeDefined()
  })

  describe('execute', () => {
    const account = '0x52908400098527886E0F7030069857D2E4169EE7'
    const transactionHash = '0x7304dc174aab2bc487b1befb9e35ba3632b9693f0c0548e138b4401f263910f1'
    const stage = 'Baby'
    const element = 'Fire'

    let result: FindHatchlingResponseDto | null = null
    let expectedResult: Hatchling = HatchlingFactory.createWithStage({
      account,
      transactionHash,
      element: ElementEnum[element],
      stage: StageEnum[stage]
    })

    describe('when there is an error finding hatchling', () => {
      const findHatchlingError = new Error('FIND_HATCHLING_ERROR')

      // @ts-ignore
      const testHatchlingRepository: HatchlingRepository = {
        find: vi.fn().mockRejectedValue(findHatchlingError)
      }

      const findHatchlingService = new FindHatchlingService(testHatchlingRepository)

      it('should throw mint NFT error', async () => {
        await expect(findHatchlingService.execute())
          .rejects.toStrictEqual(findHatchlingError)
      })
    })

    describe('when the hatchling was NOT found', () => {
      // @ts-ignore
      const testHatchlingRepository: HatchlingRepository = {
        find: vi.fn().mockResolvedValue(null)
      }

      const findHatchlingService = new FindHatchlingService(testHatchlingRepository)

      beforeAll(async () => {
        result = await findHatchlingService.execute()
      })

      it('should call Hatchling Repository find method', async () => {
        expect(testHatchlingRepository.find).toHaveBeenCalled()
      })

      it('should return null', async () => {
        expect(result).toBeNull()
      })
    })

    describe('when the hatchling was found', () => {
      // @ts-ignore
      const testHatchlingRepository: HatchlingRepository = {
        find: vi.fn().mockResolvedValue(expectedResult)
      }

      const findHatchlingService = new FindHatchlingService(testHatchlingRepository)

      beforeAll(async () => {
        result = await findHatchlingService.execute()
      })

      it('should call Hatchling Repository find method', async () => {
        expect(testHatchlingRepository.find).toHaveBeenCalled()
      })

      it('should return the expected hatchling', async () => {
        expect(result).toStrictEqual({ account, transactionHash, element, stage })
      })
    })
  })
})

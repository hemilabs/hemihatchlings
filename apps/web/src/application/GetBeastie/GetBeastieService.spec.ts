import { describe, it, expect, vi, beforeAll } from 'vitest'
import { GetBeastieService } from './GetBeastieService'
import { BeastieRepository } from '../../domain/repositories/BeastieRepository'
import { GetBeastieRequestDto, GetBeastieResponseDto } from './GetBeastieDtos'
import { Beastie } from '../../domain/entities/Beastie'

describe('src/application/GetBeastie/GetBeastieService', () => {
  it('should be defined', () => {
    expect(GetBeastieService).toBeDefined()
  })

  describe('execute', () => {
    const account = '0x52908400098527886E0F7030069857D2E4169EE7'
    const transactionHash = '0x7304dc174aab2bc487b1befb9e35ba3632b9693f0c0548e138b4401f263910f1'
    const stage = 'baby'

    let result: GetBeastieResponseDto | null = null
    let expectedResult: Beastie = { account, transactionHash, stage }

    const getBeastieRequestDto: GetBeastieRequestDto = { account, transactionHash }

    describe('when the beastie was found with success', () => {
      const testBeastieRepository: BeastieRepository = {
        find: vi.fn().mockResolvedValue(expectedResult)
      }

      const getBeastieService = new GetBeastieService(testBeastieRepository)

      beforeAll(async () => {
        result = await getBeastieService.execute(getBeastieRequestDto)
      })

      it('should call Beastie Repository find method with the right params', async () => {
        expect(testBeastieRepository.find)
          .toHaveBeenCalledWith(account, transactionHash)
      })

      it('should return the expected beastie', async () => {
        expect(result).toStrictEqual(expectedResult)
      })
    })

    describe('when there is an error finding the beastie', () => {
      const beastieFindError = new Error('Beastie find error')

      const testBeastieRepository: BeastieRepository = {
        find: vi.fn().mockRejectedValue(beastieFindError)
      }

      const getBeastieService = new GetBeastieService(testBeastieRepository)

      it('should call Transaction Repository create method ' +
         'with the right params', async () => {
        try {
          await getBeastieService.execute(getBeastieRequestDto)
        } catch (error) {
          expect(testBeastieRepository.find)
            .toHaveBeenCalledWith(account, transactionHash)
        }
      })

      it('should throw the error', async () => {
        await expect(getBeastieService.execute(getBeastieRequestDto))
          .rejects.toStrictEqual(beastieFindError)
      })
    })
  })
})

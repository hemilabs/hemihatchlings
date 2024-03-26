import axios from 'axios'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { AxiosHatchlingRepository } from './AxiosHatchlingRepository'
import { Hatchling, TransactionHash } from '@hemihatchlings/shared'

describe('src/infrastructure/AxiosHatchlingRepository', () => {
  it('should be defined', () => {
    expect(AxiosHatchlingRepository).toBeDefined()
  })

  describe('constructor', () => {
    axios.create = vi.fn()

    it('should call axios.create with the right params', async () => {
      // eslint-disable-next-line
      new AxiosHatchlingRepository()

      expect(axios.create).toHaveBeenCalledWith({
        baseURL: import.meta.env.VITE_API_URL,
        timeout: 3000
      })
    })
  })

  describe('find', () => {
    const account = '0x52908400098527886E0F7030069857D2E4169EE7'
    const transactionHash = '0x7304dc174aab2bc487b1befb9e35ba3632b9693f0c0548e138b4401f263910f1'
    const stage = 'Baby'
    const element = 'Fire'

    let result: Hatchling | null
   
    const getStageResponse = { stage }

    describe('when there is no hatchling on local storage', () => {
      const axiosHatchlingRepository = new AxiosHatchlingRepository()

      beforeAll(async () => {
        // @ts-ignore
        window.localStorage = {
          getItem: vi.fn().mockReturnValue(null)
        }
        
        result = await axiosHatchlingRepository.find()
      })

      it('should return null', async () => {
        expect(result).toBeNull()
      })
    })

    describe('when the hatchling stage was found with success', () => {
      const getMock = vi.fn(() => ({
        data: getStageResponse
      }))

      beforeAll(async () => {
        // @ts-ignore
        window.localStorage = {
          getItem: vi.fn().mockReturnValue(JSON.stringify({
            account,
            transactionHash,
            stage,
            element
          })) 
        }

        // @ts-ignore
        axios.create = vi.fn(() => ({ get: getMock }))
        const axiosHatchlingRepository = new AxiosHatchlingRepository()

        result = await axiosHatchlingRepository.find()
      })

      it('should call api.get with the right params', async () => {
        expect(getMock).toHaveBeenCalledWith(
          `/hatchling/${transactionHash}/stage`
        )
      })

      it('should return the hatchling', async () => {
        expect(result).toBeInstanceOf(Hatchling)
      })
    })

    describe('when there is an error getting the hatchling stage', () => {
      const getHatchlingStageError = new Error('Get Hatchling Stage Error')
      const getMock = vi.fn().mockRejectedValue(getHatchlingStageError)

      // @ts-expect-error
      axios.create = vi.fn(() => ({ get: getMock }))
      const axiosHatchlingRepository = new AxiosHatchlingRepository()

      it('should call api.get with the right params', async () => {
        try {
          await axiosHatchlingRepository.find()
        } catch (error) {
          expect(getMock).toHaveBeenCalledWith(
            `/hatchling/${transactionHash}/stage`,
          )
        }
      })

      it('should throw the error', async () => {
        await expect(axiosHatchlingRepository.find())
          .rejects.toStrictEqual(getHatchlingStageError)
      })
    })
  })
})

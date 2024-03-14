import axios from 'axios'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { AxiosHatchlingRepository } from './AxiosHatchlingRepository'
import { Stage, TransactionHash } from '@hemihatchlings/shared'

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

  describe('getStage', () => {
    const transactionHash = TransactionHash
      .create('0x7304dc174aab2bc487b1befb9e35ba3632b9693f0c0548e138b4401f263910f1')
    const stage = 'baby'

    let result: Stage | null
   
    const expectedResponse = { stage }

    describe('when the hatchling stage was found with success', () => {
      const getMock = vi.fn(() => ({
        data: expectedResponse
      }))

      beforeAll(async () => {
        // @ts-expect-error
        axios.create = vi.fn(() => ({ get: getMock }))
        const axiosHatchlingRepository = new AxiosHatchlingRepository()

        result = await axiosHatchlingRepository.getStage(transactionHash)
      })

      it('should call api.get with the right params', async () => {
        expect(getMock).toHaveBeenCalledWith(
          `/hatchling/${transactionHash}/stage`
        )
      })

      it('should return the expected stage', async () => {
        expect(result).toStrictEqual(expectedResponse)
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
          await axiosHatchlingRepository.getStage(transactionHash)
        } catch (error) {
          expect(getMock).toHaveBeenCalledWith(
            `/hatchling/${transactionHash}/stage`,
          )
        }
      })

      it('should throw the error', async () => {
        await expect(axiosHatchlingRepository.getStage(transactionHash))
          .rejects.toStrictEqual(getHatchlingStageError)
      })
    })
  })
})

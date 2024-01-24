import axios from 'axios'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { AxiosBeastieRepository } from './AxiosBeastieRepository'
import { Beastie } from '../domain/entities/Beastie'

describe('src/infrastructure/AxiosBeastieRepository', () => {
  it('should be defined', () => {
    expect(AxiosBeastieRepository).toBeDefined()
  })

  describe('constructor', () => {
    axios.create = vi.fn()

    it('should call axios.create with the right params', async () => {
      // eslint-disable-next-line
      new AxiosBeastieRepository()

      expect(axios.create).toHaveBeenCalledWith({
        baseURL: import.meta.env.VITE_API_URL,
        timeout: 3000
      })
    })
  })

  describe('find', () => {
    const account = '0x52908400098527886E0F7030069857D2E4169EE7'
    const transactionHash = '0x7304dc174aab2bc487b1befb9e35ba3632b9693f0c0548e138b4401f263910f1'
    const stage = 'baby'

    let result: Beastie | null
   
    const expectedResponse: Beastie = { account, transactionHash, stage }

    describe('when the beastie was found with success', () => {
      const getMock = vi.fn(() => ({
        data: expectedResponse
      }))

      beforeAll(async () => {
        // @ts-expect-error
        axios.create = vi.fn(() => ({ get: getMock }))
        const axiosBeastieRepository = new AxiosBeastieRepository()

        result = await axiosBeastieRepository.find(account, transactionHash)
      })

      it('should call api.get with the right params', async () => {
        expect(getMock).toHaveBeenCalledWith(
          `/beastie?account=${account}&hash=${transactionHash}`
        )
      })

      it('should return the expected beastie', async () => {
        expect(result).toStrictEqual(expectedResponse)
      })
    })

    describe('when there is an error finding the beastie', () => {
      const beastieFindError = new Error('Beastie Find Error')
      const getMock = vi.fn().mockRejectedValue(beastieFindError)

      // @ts-expect-error
      axios.create = vi.fn(() => ({ get: getMock }))
      const axiosBeastieRepository = new AxiosBeastieRepository()

      it('should call api.get with the right params', async () => {
        try {
          await axiosBeastieRepository.find(account, transactionHash)
        } catch (error) {
          expect(getMock).toHaveBeenCalledWith(
            `/beastie?account=${account}&hash=${transactionHash}`,
          )
        }
      })

      it('should throw the error', async () => {
        await expect(axiosBeastieRepository.find(account, transactionHash))
          .rejects.toStrictEqual(beastieFindError)
      })
    })
  })
})

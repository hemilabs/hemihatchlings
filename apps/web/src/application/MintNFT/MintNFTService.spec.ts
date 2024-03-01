import { describe, it, expect, vi } from 'vitest'
import { MintNFTService } from './MintNFTService'
import { WalletRepository } from '../../domain/repositories/WalletRepository'
import { WalletNotConnectedError } from '../../domain/errors/WalletNotConnectedError'

describe('src/application/MintNFT/MintNFTService', () => {
  const transactionHash = '0xa07FA473B87D7ADee161f458aF300255B65F33f6'

  it('should be defined', () => {
    expect(MintNFTService).toBeDefined()
  })

  describe('execute', () => {
    describe('when wallet is not connected', () => {
      // @ts-ignore
      const testWalletRepository: WalletRepository = {
        isConnected: vi.fn().mockReturnValue(false)
      }

      const mintNFTService = new MintNFTService(testWalletRepository)

      it('should throw WalletNotConnectedError error', async () => {
        const expectedError = new WalletNotConnectedError()

        await expect(mintNFTService.execute())
          .rejects.toStrictEqual(expectedError)
      })
    })

    describe('when mint NFT throws an error', () => {
      const mintNFTError = new Error('MINT_NFT_ERROR')

      // @ts-ignore
      const testWalletRepository: WalletRepository = {
        isConnected: vi.fn().mockReturnValue(true),
        mintNFT: vi.fn().mockRejectedValue(mintNFTError),
      }

      const mintNFTService = new MintNFTService(testWalletRepository)

      it('should throw mint NFT error', async () => {
        await expect(mintNFTService.execute())
          .rejects.toStrictEqual(mintNFTError)
      })
    })

    describe('when NFT is minted with success', () => {
      // @ts-ignore
      const testWalletRepository: WalletRepository = {
        isConnected: vi.fn().mockReturnValue(true),
        mintNFT: vi.fn().mockResolvedValue(transactionHash),
      }

      const mintNFTService = new MintNFTService(testWalletRepository)

      it('should return the minted NFT transaction hash', async () => {
        const result = await mintNFTService.execute()
        
        expect(result.transactionHash).toBe(transactionHash)
      })
    })
  })
})

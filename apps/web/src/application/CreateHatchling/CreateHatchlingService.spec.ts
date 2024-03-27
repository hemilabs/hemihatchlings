import { describe, it, expect, vi } from 'vitest'
import { CreateHatchlingService } from './CreateHatchlingService'
import { WalletRepository } from '../../domain/repositories/WalletRepository'
import { WalletNotConnectedError } from '../../domain/errors/WalletNotConnectedError'
import { TransactionHash } from '@hemihatchlings/shared'
import { WalletUnavailableError } from '../../domain/errors/WalletUnavailableError'

describe('src/application/CreateHatchling/CreateHatchlingService', () => {
  const address = '0x52908400098527886E0F7030069857D2E4169EE7'
  const transactionHash = '0x9abab8480d6da31404f045c011ec9fafee4e869bb34808f96852a0fd81bbcc0d'
  const element = 'Fire'

  it('should be defined', () => {
    expect(CreateHatchlingService).toBeDefined()
  })

  describe('execute', () => {
    describe('when wallet is not available', () => {
      // @ts-ignore
      const testWalletRepository: WalletRepository = {
        exists: vi.fn().mockReturnValue(false)
      }

      // @ts-ignore
      const testHatchlingRepository: HatchlingRepository = {
        create: vi.fn()
      }

      const createHatchlingService = new CreateHatchlingService(
        testWalletRepository,
        testHatchlingRepository
      )

      it('should throw WalletUnavailableError error', async () => {
        const expectedError = new WalletUnavailableError()

        await expect(createHatchlingService.execute({ element }))
          .rejects.toStrictEqual(expectedError)
      })
    })

    describe('when wallet is not connected', () => {
      // @ts-ignore
      const testWalletRepository: WalletRepository = {
        exists: vi.fn().mockReturnValue(true),
        isConnected: vi.fn().mockReturnValue(false),
        connect: vi.fn().mockResolvedValue({ address }),
        addNetwork: vi.fn(),
        switchNetwork: vi.fn()
      }

      // @ts-ignore
      const testHatchlingRepository: HatchlingRepository = {
        create: vi.fn()
      }

      const createHatchlingService = new CreateHatchlingService(
        testWalletRepository,
        testHatchlingRepository
      )

      it('should throw WalletNotConnectedError error', async () => {
        const expectedError = new WalletNotConnectedError()

        await expect(createHatchlingService.execute({ element }))
          .rejects.toStrictEqual(expectedError)
      })
    })

    describe('when mint NFT throws an error', () => {
      const mintNftError = new Error('MINT_NFT_ERROR')

      // @ts-ignore
      const testWalletRepository: WalletRepository = {
        exists: vi.fn().mockReturnValue(true),
        mintNFT: vi.fn().mockRejectedValue(mintNftError),
        isConnected: vi.fn().mockReturnValue(true),
        connect: vi.fn().mockResolvedValue({ address }),
        addNetwork: vi.fn(),
        switchNetwork: vi.fn()
      }

      // @ts-ignore
      const testHatchlingRepository: HatchlingRepository = {
        create: vi.fn()
      }

      const createHatchlingService = new CreateHatchlingService(
        testWalletRepository,
        testHatchlingRepository
      )

      it('should throw mint NFT error', async () => {
        await expect(createHatchlingService.execute({ element }))
          .rejects.toStrictEqual(mintNftError)
      })
    })

    describe('when NFT is minted with success', () => {
      // @ts-ignore
      const testWalletRepository: WalletRepository = {
        connect: vi.fn().mockResolvedValue({ address }),
        exists: vi.fn().mockReturnValue(true),
        mintNFT: vi.fn().mockResolvedValue(TransactionHash.create(transactionHash)),
        isConnected: vi.fn().mockReturnValue(true),
        addNetwork: vi.fn(),
        switchNetwork: vi.fn()
      }

      // @ts-ignore
      const testHatchlingRepository: HatchlingRepository = {
        create: vi.fn()
      }

      const createHatchlingService = new CreateHatchlingService(
        testWalletRepository,
        testHatchlingRepository
      )

      it('should call create method from HatchlingRepository ', async () => {
        await createHatchlingService.execute({ element })

        expect(testHatchlingRepository.create)
          .toHaveBeenCalled()
      })
    })
  })
})

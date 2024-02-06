import { describe, it, expect, vi } from 'vitest'
import { ConnectWalletService } from './ConnectWalletService'
import { WalletRepository } from '../../domain/repositories/WalletRepository'
import { Wallet } from '../../domain/entities/Wallet'
import { WalletUnavailableError } from '../../domain/errors/WalletUnavailableError'

describe('src/application/ConnectWallet/ConnectWalletService', () => {
  const address = '0x52908400098527886E0F7030069857D2E4169EE7'

  it('should be defined', () => {
    expect(ConnectWalletService).toBeDefined()
  })

  describe('execute', () => {
    describe('when wallet extension is not available', () => {
      // @ts-ignore
      const testWalletRepository: WalletRepository = {
        exists: vi.fn().mockReturnValue(false)
      }

      const connectWalletService = new ConnectWalletService(testWalletRepository)

      it('should throw WalletUnavailableError error', async () => {
        const expectedError = new WalletUnavailableError()

        await expect(connectWalletService.execute())
          .rejects.toStrictEqual(expectedError)
      })
    })

    describe('when wallet connection throws an error', () => {
      const connectionError = new Error('WALLET_CONNECTION_ERROR')

      // @ts-ignore
      const testWalletRepository: WalletRepository = {
        exists: vi.fn().mockReturnValue(true),
        connect: vi.fn().mockRejectedValue(connectionError)
      }

      const connectWalletService = new ConnectWalletService(testWalletRepository)

      it('should throw connection error', async () => {
        await expect(connectWalletService.execute())
          .rejects.toStrictEqual(connectionError)
      })
    })

    describe('when wallet switch network throws an error', () => {
      const wallet: Wallet = { address }
      const switchNetworkError = new Error('WALLET_SWITCH_NETWORK_ERROR')

      // @ts-ignore
      const testWalletRepository: WalletRepository = {
        exists: vi.fn().mockReturnValue(true),
        connect: vi.fn().mockResolvedValue(wallet),
        switchNetwork: vi.fn().mockRejectedValue(switchNetworkError),
        addNetwork: vi.fn()
      }

      const connectWalletService = new ConnectWalletService(testWalletRepository)

      it('should call addNetwork method from WalletRepository', async () => {
        await connectWalletService.execute()

        expect(testWalletRepository.addNetwork)
          .toHaveBeenCalledOnce()
      })
    })

    describe('when wallet add network throws an error', () => {
      const wallet: Wallet = { address }
      const switchNetworkError = new Error('WALLET_SWITCH_NETWORK_ERROR')
      const addNetworkError = new Error('WALLET_ADD_NETWORK_ERROR')

      // @ts-ignore
      const testWalletRepository: WalletRepository = {
        exists: vi.fn().mockReturnValue(true),
        connect: vi.fn().mockResolvedValue(wallet),
        switchNetwork: vi.fn().mockRejectedValue(switchNetworkError),
        addNetwork: vi.fn().mockRejectedValue(addNetworkError)
      }

      const connectWalletService = new ConnectWalletService(testWalletRepository)

      it('should throw add network error', async () => {
        await expect(connectWalletService.execute())
          .rejects.toStrictEqual(addNetworkError)
      })
    })

    describe('when wallet connects and switches to the correct network', () => {
      const wallet: Wallet = { address }

      // @ts-ignore
      const testWalletRepository: WalletRepository = {
        exists: vi.fn().mockReturnValue(true),
        connect: vi.fn().mockResolvedValue(wallet),
        switchNetwork: vi.fn(),
        addNetwork: vi.fn()
      }

      const connectWalletService = new ConnectWalletService(testWalletRepository)

      it('should return the wallet address', async () => {
        const result = await connectWalletService.execute()
        
        expect(result.address).toBe(wallet.address)
      })
    })
  })
})

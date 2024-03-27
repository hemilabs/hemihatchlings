import axios from 'axios'
import { ElementEnum, TransactionHash } from '@hemihatchlings/shared'
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { EthersWalletRepository } from './EthersWalletRepository'
import { Wallet } from '../domain/entities/Wallet'

vi.mock('ethers', async () => {
  return {
    ethers: {
      BrowserProvider: vi.fn().mockReturnValue({
        send: vi.fn(),
        getSigner: vi.fn().mockResolvedValue({
          address: '0x52908400098527886E0F7030069857D2E4169EE7'
        })
      }),
      Contract: vi.fn().mockReturnValue({
        mintNFTs: vi.fn().mockResolvedValue({
          hash: '0x9abab8480d6da31404f045c011ec9fafee4e869bb34808f96852a0fd81bbcc0d'
        })
      })
    }
  }
})

describe('src/infrastructure/EthersWalletRepository', () => {
  it('should be defined', () => {
    expect(EthersWalletRepository).toBeDefined()
  })

  describe('constructor', () => {
    axios.create = vi.fn()

    it('should set the environment variables to chainData', async () => {
      const repository = new EthersWalletRepository()

      expect(repository['chainData']).toStrictEqual({
        chainId: import.meta.env.VITE_CHAIN_ID,
        chainName: import.meta.env.VITE_CHAIN_NAME,
        rpcUrls: [import.meta.env.VITE_CHAIN_RPC_URL],
        blockExplorerUrls: [import.meta.env.VITE_CHAIN_BLOCK_EXPLORER_URL],
        nativeCurrency: {
          name: import.meta.env.VITE_CHAIN_CURRENCY_NAME,
          symbol: import.meta.env.VITE_CHAIN_CURRENCY_SYMBOL,
          decimals: parseInt(import.meta.env.VITE_CHAIN_CURRENCY_DECIMALS || '')
        }
      })
    })
  })

  describe('exists', () => {
    const repository = new EthersWalletRepository()

    describe('when wallet extension is NOT available', () => {
      it('should return false', () => {
        // @ts-ignore
        window.ethereum = undefined

        expect(repository.exists()).toBeFalsy()
      })
    })

    describe('when wallet extension is available', () => {      
      it('should return true', () => {
        // @ts-ignore
        window.ethereum = vi.fn()

        expect(repository.exists()).toBeTruthy()
      })
    })
  })

  describe('connect', () => {
    let result: Wallet
    const expectedResult = { address: '0x52908400098527886E0F7030069857D2E4169EE7' }
    const repository = new EthersWalletRepository()

    beforeAll(async () => {
      result = await repository.connect()
    })

    it('should call provider send method with the right params', () => {
      expect(repository['provider']?.send)
        .toHaveBeenCalledWith('eth_requestAccounts', [])
    })

    it('should return the correct wallet address', () => {
      expect(result).toStrictEqual(expectedResult)
    })
  })

  describe('switchNetwork', () => {
    const repository = new EthersWalletRepository()

    beforeAll(async () => {
      await repository.connect()
      await repository.switchNetwork()
    })

    it('should call provider send method with the right params', () => {
      expect(repository['provider']?.send).toHaveBeenCalledWith(
        'wallet_switchEthereumChain',
        [{ chainId: repository['chainData'].chainId }]
      )
    })
  })

  describe('addNetwork', () => {
    const repository = new EthersWalletRepository()

    beforeAll(async () => {
      await repository.connect()
      await repository.addNetwork()
    })

    it('should call provider send method with the right params', () => {
      expect(repository['provider']?.send).toHaveBeenCalledWith(
        'wallet_addEthereumChain',
        [ repository['chainData'] ]
      )
    })
  })

  describe('mintNFT', () => {
    const repository = new EthersWalletRepository()
    let result: TransactionHash

    beforeAll(async () => {
      await repository.connect()
      result = await repository.mintNFT(ElementEnum.Fire)
    })

    it('should return the minted NFT transaction hash', () => {
      const expectedResult = TransactionHash.create('0x9abab8480d6da31404f045c011ec9fafee4e869bb34808f96852a0fd81bbcc0d')
      
      expect(result).toStrictEqual(expectedResult)
    })
  })
})

import { BrowserProvider, ethers } from 'ethers'
import { WalletRepository } from '../domain/repositories/WalletRepository'
import { Wallet } from '../domain/entities/Wallet'

interface ChainData {
  chainId: string,
  chainName: string,
  rpcUrls: Array<string>,
  blockExplorerUrls: Array<string>,
  nativeCurrency: {
    name: string,
    symbol: string,
    decimals: number
  }
}

export class EthersWalletRepository implements WalletRepository {
  private provider: BrowserProvider | undefined
  private chainData: ChainData

  constructor() {
    this.chainData = {
      chainId: import.meta.env.VITE_CHAIN_ID,
      chainName: import.meta.env.VITE_CHAIN_NAME,
      rpcUrls: [import.meta.env.VITE_CHAIN_RPC_URL],
      blockExplorerUrls: [import.meta.env.VITE_CHAIN_BLOCK_EXPLORER_URL],
      nativeCurrency: {
        name: import.meta.env.VITE_CHAIN_CURRENCY_NAME,
        symbol: import.meta.env.VITE_CHAIN_CURRENCY_SYMBOL,
        decimals: parseInt(import.meta.env.VITE_CHAIN_CURRENCY_DECIMALS)
      }
    }
  }


  exists(): boolean {
    // @ts-ignore
    return typeof window.ethereum !== 'undefined'
  }

  async connect(): Promise<Wallet> {
    // @ts-ignore
    this.provider = new ethers.BrowserProvider(window.ethereum)

    await this.provider?.send('eth_requestAccounts', []);
    const { address } = await this.provider.getSigner()

    return { address }
  }

  async switchNetwork(): Promise<void> {
    await this.provider?.send(
      'wallet_switchEthereumChain',
      [{ chainId: this.chainData.chainId }]
    )
  }

  async addNetwork(): Promise<void> {
    await this.provider?.send(
      'wallet_addEthereumChain',
      [ this.chainData ]
    )
  }
}

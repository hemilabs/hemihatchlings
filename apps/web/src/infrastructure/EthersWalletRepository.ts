import { BrowserProvider, Contract, ethers } from 'ethers'
import { WalletRepository } from '../domain/repositories/WalletRepository'
import { Wallet } from '../domain/entities/Wallet'
import ABI from './ContractABI'

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
  private contractAddress: string
  private contract: Contract | undefined

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

    this.contractAddress = import.meta.env.VITE_SMART_CONTRACT_ADDRESS
  }

  exists(): boolean {
    // @ts-ignore
    return typeof window.ethereum !== 'undefined'
  }

  isConnected(): boolean {
    return this.provider != null &&
          this.contract !== null
  }

  async connect(): Promise<Wallet> {
    // @ts-ignore
    this.provider = new ethers.BrowserProvider(window.ethereum)

    await this.provider?.send('eth_requestAccounts', []);
    const signer =  await this.provider.getSigner()
    const { address } = signer

    this.contract = new ethers.Contract(this.contractAddress, ABI, signer);

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

  async mintNFT(): Promise<string> {
    const { hash } = await this.contract?.mintNFTs(1)

    return hash
  }
}

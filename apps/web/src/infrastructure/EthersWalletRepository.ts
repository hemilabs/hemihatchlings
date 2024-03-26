import { ElementEnum, TransactionHash } from '@hemihatchlings/shared'
import { BrowserProvider, Contract, JsonRpcSigner, ethers } from 'ethers'
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

type ContractAddress = {
  [key in ElementEnum]: string
}

export class EthersWalletRepository implements WalletRepository {
  private provider: BrowserProvider | undefined
  private chainData: ChainData
  private contractAddress: ContractAddress
  private signer: JsonRpcSigner | undefined

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

    this.contractAddress = {
      [ElementEnum.Fire]: import.meta.env.VITE_FIRE_SMART_CONTRACT_ADDRESS,
      [ElementEnum.Water]: import.meta.env.VITE_WATER_SMART_CONTRACT_ADDRESS,
      [ElementEnum.Grass]: import.meta.env.VITE_GRASS_SMART_CONTRACT_ADDRESS,
      [ElementEnum.Air]: import.meta.env.VITE_AIR_SMART_CONTRACT_ADDRESS
    }
  }

  exists(): boolean {
    // @ts-ignore
    return typeof window.ethereum !== 'undefined'
  }

  isConnected(): boolean {
    return this.provider != null
  }

  async connect(): Promise<Wallet> {
    // @ts-ignore
    this.provider = new ethers.BrowserProvider(window.ethereum)

    await this.provider?.send('eth_requestAccounts', [])

    this.signer =  await this.provider.getSigner()
    const { address } = this.signer



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

  async mintNFT(element: ElementEnum): Promise<TransactionHash> {
    const contractAddress = this.contractAddress[element]
    const contract = new ethers.Contract(contractAddress, ABI, this.signer)

    const { hash } = await contract.mintNFTs(1)

    return TransactionHash.create(hash)
  }
}

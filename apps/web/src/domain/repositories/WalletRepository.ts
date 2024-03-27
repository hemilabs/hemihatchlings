import { ElementEnum, TransactionHash } from '@hemihatchlings/shared'
import { Wallet } from '../entities/Wallet'

export interface WalletRepository {
  exists(): boolean
  isConnected(): boolean
  connect(): Promise<Wallet>
  addNetwork(): Promise<void>
  switchNetwork(): Promise<void>
  mintNFT(element: ElementEnum): Promise<TransactionHash>
}

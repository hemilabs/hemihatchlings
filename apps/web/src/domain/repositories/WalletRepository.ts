import { Wallet } from '../entities/Wallet'

export interface WalletRepository {
  exists(): boolean
  isConnected(): boolean
  connect(): Promise<Wallet>
  addNetwork(): Promise<void>
  switchNetwork(): Promise<void>
  mintNFT(): Promise<string>
}

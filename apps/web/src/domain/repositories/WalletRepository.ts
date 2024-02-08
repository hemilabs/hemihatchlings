import { Wallet } from '../entities/Wallet'

export interface WalletRepository {
  exists(): boolean
  connect(): Promise<Wallet>
  addNetwork(): Promise<void>
  switchNetwork(): Promise<void>
}

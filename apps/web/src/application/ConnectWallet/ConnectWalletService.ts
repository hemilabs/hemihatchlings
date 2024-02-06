import { WalletUnavailableError } from '../../domain/errors/WalletUnavailableError'
import { WalletRepository } from '../../domain/repositories/WalletRepository'
import { ConnectWalletResponseDto } from './ConnectWalletDto'

export class ConnectWalletService {
  constructor(private readonly walletRepository: WalletRepository) {}

  async execute(): Promise<ConnectWalletResponseDto> {
    if (!this.walletRepository.exists()) {
      throw new WalletUnavailableError()
    }

    const { address } = await this.walletRepository.connect()

    try {
      await this.walletRepository.switchNetwork()
    }
    catch (error) {
      await this.walletRepository.addNetwork()
    }

   return { address }
  }
}

import { WalletNotConnectedError } from '../../domain/errors/WalletNotConnectedError'
import { WalletRepository } from '../../domain/repositories/WalletRepository'
import { MintNFTResponseDto } from './MintNFTDto'

export class MintNFTService {
  constructor(private readonly walletRepository: WalletRepository) {}

  async execute(): Promise<MintNFTResponseDto> {
    if (!this.walletRepository.isConnected()) {
      throw new WalletNotConnectedError()
    }

    const transactionHash = await this.walletRepository.mintNFT()

   return { transactionHash }
  }
}

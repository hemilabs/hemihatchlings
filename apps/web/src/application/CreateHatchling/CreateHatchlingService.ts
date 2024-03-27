import {
  ElementEnum,
  HatchlingFactory,
  TransactionStatusEnum
} from '@hemihatchlings/shared'
import {
  WalletNotConnectedError
} from '../../domain/errors/WalletNotConnectedError'
import {
  WalletRepository
} from '../../domain/repositories/WalletRepository'
import {
  CreateHatchlingRequestDto
} from './CreateHatchlingDto'
import {
  HatchlingRepository
} from '../../domain/repositories/HatchlingRepository'
import {
  WalletUnavailableError
} from '../../domain/errors/WalletUnavailableError'

export class CreateHatchlingService {
  constructor(
    private readonly walletRepository: WalletRepository,
    private readonly hatchlingRepository: HatchlingRepository,
  ) {}

  async execute(
    createHatchlingDto: CreateHatchlingRequestDto
  ): Promise<void> {
    const { element } = createHatchlingDto
    const hatchlingElement = element as ElementEnum

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

    if (!this.walletRepository.isConnected()) {
      throw new WalletNotConnectedError()
    }

    const transactionHash =
      await this.walletRepository.mintNFT(hatchlingElement)

    const hatchling = HatchlingFactory.createWithStatus({
      account: address,
      transactionHash: transactionHash.value,
      transactionStatus: TransactionStatusEnum.Minted,
      element: hatchlingElement
    })

    this.hatchlingRepository.create(hatchling)
  }
}

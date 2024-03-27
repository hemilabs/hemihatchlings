import {
  HatchlingRepository
} from '../../domain/repositories/HatchlingRepository'
import {
  FindHatchlingResponseDto
} from './FindHatchlingDto'

export class FindHatchlingService {
  constructor(private readonly hatchlingRepository: HatchlingRepository) {}

  async execute(): Promise<FindHatchlingResponseDto | null> {
    const hatchling = await this.hatchlingRepository.find()

    if (hatchling == null) {
      return null
    }

    const { account, transactionHash, element, stage } = hatchling

    return {
      account: account.value,
      transactionHash: transactionHash.value,
      element: element?.value ?? '',
      stage: stage.value
    }
  }
}

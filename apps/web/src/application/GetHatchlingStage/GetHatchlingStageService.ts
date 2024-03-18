import { TransactionHash } from '@hemihatchlings/shared'
import {
  HatchlingRepository
} from '../../domain/repositories/HatchlingRepository'
import {
  GetHatchlingStageRequestDto,
  GetHatchlingStageResponseDto
} from './GetHatchlingStageDtos'

export class GetHatchlingStageService {
  constructor(private readonly hatchlingRepository: HatchlingRepository) {}

  async execute({
    transactionHash
  }: GetHatchlingStageRequestDto): Promise<GetHatchlingStageResponseDto | null> {
    const hash = TransactionHash.create(transactionHash)
    const stage = await this.hatchlingRepository.getStage(hash)

    if (stage == null) {
      return null
    }

    return { stage: stage.value }
  }
}

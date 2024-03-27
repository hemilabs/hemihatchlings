import { TransactionHash } from '@hemihatchlings/shared'
import { HatchlingRepository } from '../../domain/repositories/HatchlingRepository'
import { HatchlingNotFoundError } from '../errors/HatchlingNotFoundError'
import {
  GetHatchlingStageRequestDto,
  GetHatchlingStageResponseDto
} from './GetHatchlingStageDtos'

export class GetHatchlingStageService {
  private readonly hatchlingRepository: HatchlingRepository

  constructor(hatchlingRepository: HatchlingRepository) {
    this.hatchlingRepository = hatchlingRepository
  }

  async execute({
    transactionHash
  }: GetHatchlingStageRequestDto): Promise<GetHatchlingStageResponseDto> {
    const hash = TransactionHash.create(transactionHash)
    const stage = await this.hatchlingRepository.getStage(hash)
    
    if (stage == null) {
      throw new HatchlingNotFoundError()
    }
    
    return { stage: stage.value }
  }
}

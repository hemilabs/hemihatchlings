import { BeastieRepository } from '../../domain/repositories/BeastieRepository';
import { GetBeastieRequestDto, GetBeastieResponseDto } from './GetBeastieDtos';

export class GetBeastieService {
  constructor(private readonly beastieRepository: BeastieRepository) {}

  async execute({
    account,
    transactionHash
  }: GetBeastieRequestDto): Promise<GetBeastieResponseDto | null> {
    return await this.beastieRepository.find(account, transactionHash)
  }
}

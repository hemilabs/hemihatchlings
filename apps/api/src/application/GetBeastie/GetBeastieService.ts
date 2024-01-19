import { BeastieNotFoundError } from '../../domain/errors/BeastieNotFoundError'
import { BeastieRepository } from '../../domain/repositories/BeastieRepository'
import { TransactionHash } from '../../domain/valueObjects/TransactionHash'
import { GetBeastieRequestDto, GetBeastieResponseDto } from './GetBeastieDtos'

export class GetBeastieService {
  private readonly beastieRepository: BeastieRepository

  constructor(beastieRepository: BeastieRepository) {
    this.beastieRepository = beastieRepository
  }

  async execute({ account, transactionHash }: GetBeastieRequestDto): Promise<GetBeastieResponseDto> {
    const hash = TransactionHash.create(transactionHash)
    const beastie = await this.beastieRepository.findByTransaction(hash)
    
    if (beastie == null ||
        beastie.account !== account.toLowerCase()) {
      throw new BeastieNotFoundError()
    }

    const { stage } = beastie
    
    return { account, transactionHash, stage }
  }
}

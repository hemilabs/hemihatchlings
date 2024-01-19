import { Beastie } from '../entities/Beastie'
import { TransactionHash } from '../valueObjects/TransactionHash'

export interface BeastieRepository {
  findByTransaction(transaction: TransactionHash): Promise<Beastie | null>
}

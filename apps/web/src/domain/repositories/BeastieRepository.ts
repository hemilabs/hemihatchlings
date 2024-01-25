import { Beastie } from '../entities/Beastie'

export interface BeastieRepository {
  find(account: string, transaction: string): Promise<Beastie | null>
}

import { Hatchling, Stage, TransactionHash } from '@hemihatchlings/shared'

export interface HatchlingRepository {
  create(hatchling: Hatchling): void
  find(): Promise<Hatchling | null>
}

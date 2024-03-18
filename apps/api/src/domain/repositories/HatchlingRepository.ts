import { Stage, TransactionHash } from '@hemihatchlings/shared'

export interface HatchlingRepository {
  getStage(transactionHash: TransactionHash): Promise<Stage | null>
}

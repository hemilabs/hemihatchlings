import { Hatchling } from '../entities/Hatchling'
import { Address } from '../valueObjects/Address'
import { TransactionHash } from '../valueObjects/TransactionHash'
import { TransactionStatusEnum } from '../enums/TransactionStatusEnum'
import { TransactionStatus } from '../valueObjects/TransactionStatus'
import { ElementEnum } from '../enums/ElementEnum'
import { Element } from '../valueObjects/Element'
import { Uuid } from '../valueObjects/Uuid'
import { Stage } from '../valueObjects/Stage'
import { StageEnum } from '../enums/StageEnum'

interface CreateWithStatusProps {
  id?: string
  account: string
  transactionHash: string
  transactionStatus: TransactionStatusEnum,
  element?: ElementEnum
}

interface CreateWithStageProps {
  id?: string
  account: string
  transactionHash: string
  stage: StageEnum,
  element?: ElementEnum
}

export class HatchlingFactory {
  static createWithStatus({
    id, account, transactionHash, transactionStatus, element
  }: CreateWithStatusProps): Hatchling {
    return Hatchling.createWithStatus({
      account: Address.create(account),
      transactionHash: TransactionHash.create(transactionHash),
      transactionStatus: TransactionStatus.create(transactionStatus),
      element: element ? Element.create(element) : undefined
    }, Uuid.create(id))
  }

  static createWithStage({
    id, account, transactionHash, stage, element
  }: CreateWithStageProps): Hatchling {
    return Hatchling.createWithStage({
      account: Address.create(account),
      transactionHash: TransactionHash.create(transactionHash),
      stage: Stage.create(stage),
      element: element ? Element.create(element) : undefined
    }, Uuid.create(id))
  }
}

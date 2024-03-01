import { Entity, Uuid } from '@hemihatchlings/shared'
import { Address } from '../valueObjects/Address'
import { TransactionHash } from '../valueObjects/TransactionHash'
import { Stage } from '../valueObjects/Stage'
import { TransactionStatus } from '../valueObjects/TransactionStatus'
import { TransactionStatusEnum } from '../enums/TransactionStatusEnum'
import { StageEnum } from '../enums/StageEnum'

interface BeastieProps {
  account: Address
  transactionHash: TransactionHash
  transactionStatus: TransactionStatus
  stage: Stage
}

interface CreateProps {
  account: Address
  transactionHash: TransactionHash
  transactionStatus: TransactionStatus
}

export class Beastie extends Entity<BeastieProps> {
  private constructor(props: BeastieProps, id: Uuid) {
    super(props, id)
  }

  static create(props: CreateProps, id?: Uuid): Beastie {
    const beastieId = id ?? Uuid.create()
    const stage = this.getStageFromStatus(props.transactionStatus)

    return new Beastie({ ...props, stage }, beastieId)
  }

  private static getStageFromStatus(status: TransactionStatus): Stage {
    if (status.value === TransactionStatusEnum.EthFinality) {
      return Stage.create(StageEnum.Adolescent)
    }

    if (status.value === TransactionStatusEnum.BtcFinality) {
      return Stage.create(StageEnum.Adult)
    }

    return Stage.create(StageEnum.Baby)
  }

  get account(): string {
    return this.props.account.value
  }

  get transactionHash(): string {
    return this.props.transactionHash.value
  }

  get transactionStatus(): string {
    return this.props.transactionStatus.value
  }

  get stage(): string {
    return this.props.stage.value
  }
}

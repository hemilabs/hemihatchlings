import { Address } from '../valueObjects/Address'
import { TransactionHash } from '../valueObjects/TransactionHash'
import { Stage } from '../valueObjects/Stage'
import { TransactionStatus } from '../valueObjects/TransactionStatus'
import { TransactionStatusEnum } from '../enums/TransactionStatusEnum'
import { StageEnum } from '../enums/StageEnum'
import { Entity } from '../base/Entity'
import { Uuid } from '../valueObjects/Uuid'
import { Element } from '../valueObjects/Element'

interface HatchlingProps {
  account: Address
  transactionHash: TransactionHash
  transactionStatus: TransactionStatus
  stage: Stage
  element?: Element
}

interface CreateWithStatusProps {
  account: Address
  transactionHash: TransactionHash
  transactionStatus: TransactionStatus
  element?: Element
}

interface CreateWithStageProps {
  account: Address
  transactionHash: TransactionHash
  stage: Stage
  element?: Element
}

export class Hatchling extends Entity<HatchlingProps> {
  private constructor(props: HatchlingProps, id: Uuid) {
    super(props, id)
  }

  static createWithStatus(props: CreateWithStatusProps, id?: Uuid): Hatchling {
    const hatchlingId = id ?? Uuid.create()
    const stage = this.getStageFromStatus(props.transactionStatus)

    return new Hatchling({ ...props, stage }, hatchlingId)
  }

  static createWithStage(props: CreateWithStageProps, id?: Uuid): Hatchling {
    const hatchlingId = id ?? Uuid.create()
    const transactionStatus = this.getStatusFromStage(props.stage)

    return new Hatchling({ ...props, transactionStatus }, hatchlingId)
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

  private static getStatusFromStage(stage: Stage): TransactionStatus {
    if (stage.value === StageEnum.Adolescent) {
      return TransactionStatus.create(TransactionStatusEnum.EthFinality)
    }

    if (stage.value === StageEnum.Adult ) {
      return TransactionStatus.create(TransactionStatusEnum.BtcFinality)
    }

    return TransactionStatus.create(TransactionStatusEnum.Minted)
  }

  get account(): Address {
    return this.props.account
  }

  get transactionHash(): TransactionHash {
    return this.props.transactionHash
  }

  get transactionStatus(): TransactionStatus {
    return this.props.transactionStatus
  }

  get stage(): Stage {
    return this.props.stage
  }

  get element(): Element | undefined {
    return this.props.element
  }
}

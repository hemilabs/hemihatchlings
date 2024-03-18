import { Hatchling } from '../entities/Hatchling'
import { Address } from '../valueObjects/Address'
import { TransactionHash } from '../valueObjects/TransactionHash'
import { TransactionStatusEnum } from '../enums/TransactionStatusEnum'
import { TransactionStatus } from '../valueObjects/TransactionStatus'
import { ElementEnum } from '../enums/ElementEnum'
import { Element } from '../valueObjects/Element'
import { Uuid } from '../valueObjects/Uuid'

interface CreateProps {
  id?: string
  account: string
  transactionHash: string
  transactionStatus: TransactionStatusEnum,
  element?: ElementEnum
}

export class HatchlingFactory {
  static create({
    id, account, transactionHash, transactionStatus, element
  }: CreateProps): Hatchling {
    return Hatchling.create({
      account: Address.create(account),
      transactionHash: TransactionHash.create(transactionHash),
      transactionStatus: TransactionStatus.create(transactionStatus),
      element: element ? Element.create(element) : undefined
    }, Uuid.create(id))
  }
}

import { Uuid } from '@hemihatchlings/shared'
import { Beastie } from '../entities/Beastie'
import { Address } from '../valueObjects/Address'
import { TransactionHash } from '../valueObjects/TransactionHash'
import { TransactionStatusEnum } from '../enums/TransactionStatusEnum'
import { TransactionStatus } from '../valueObjects/TransactionStatus'

interface CreateProps {
  id?: string
  account: string
  transactionHash: string
  transactionStatus: TransactionStatusEnum
}

export class BeastieFactory {
  static async create({
    id, account, transactionHash, transactionStatus
  }: CreateProps): Promise<Beastie> {
    return Beastie.create({
      account: Address.create(account),
      transactionHash: TransactionHash.create(transactionHash),
      transactionStatus: TransactionStatus.create(transactionStatus)
    }, Uuid.create(id))
  }
}

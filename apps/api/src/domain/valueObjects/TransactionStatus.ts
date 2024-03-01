import { ValueObject } from '@hemihatchlings/shared'
import { InvalidTransactionStatusError } from '../errors/InvalidTransactionStatusError'
import { TransactionStatusEnum } from '../enums/TransactionStatusEnum'

interface TransactionStatusProps {
  value: TransactionStatusEnum
}

export class TransactionStatus extends ValueObject<TransactionStatusProps> {
  private constructor(status: TransactionStatusEnum) {
    super({ value: status })
  }

  static create(status: TransactionStatusEnum): TransactionStatus {
    if (typeof status !== 'string' ||
      !Object.values(TransactionStatusEnum).includes(status)) {
      throw new InvalidTransactionStatusError()
    }

    return new TransactionStatus(status)
  }

  get value(): string {
    return this.props.value
  }
}

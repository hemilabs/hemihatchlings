import { ValueObject } from '../base/ValueObject'
import { InvalidTransactionHashError } from '../errors/InvalidTransactionHashError'

interface TransactionHashProps {
  value: string
}

const hashRegex = /^0x[a-fA-F0-9]{64}$/

export class TransactionHash extends ValueObject<TransactionHashProps> {
  private constructor(hash: string) {
    super({ value: hash })
  }

  static create(hash: string): TransactionHash {
    if (typeof hash !== 'string' ||
        !hashRegex.test(hash)) {
      throw new InvalidTransactionHashError()
    }

    return new TransactionHash(hash)
  }

  get value(): string {
    return this.props.value
  }
}

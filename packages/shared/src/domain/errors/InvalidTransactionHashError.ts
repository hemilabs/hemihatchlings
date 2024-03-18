import { DomainError } from '../base/DomainError'

export class InvalidTransactionHashError extends DomainError {
  constructor() {
    super('INVALID_TRANSACTION_HASH', true)
  }
}

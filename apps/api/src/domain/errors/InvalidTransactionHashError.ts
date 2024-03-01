import { DomainError } from '@hemihatchlings/shared'

export class InvalidTransactionHashError extends DomainError {
  constructor() {
    super('INVALID_TRANSACTION_HASH', true)
  }
}

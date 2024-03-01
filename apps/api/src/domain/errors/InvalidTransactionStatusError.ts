import { DomainError } from '@hemihatchlings/shared'

export class InvalidTransactionStatusError extends DomainError {
  constructor() {
    super('INVALID_TRANSACTION_STATUS', true)
  }
}

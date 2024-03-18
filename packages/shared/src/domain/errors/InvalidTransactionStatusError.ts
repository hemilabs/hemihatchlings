import { DomainError } from '../base/DomainError'

export class InvalidTransactionStatusError extends DomainError {
  constructor() {
    super('INVALID_TRANSACTION_STATUS', true)
  }
}

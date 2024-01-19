import { DomainError } from '@bitbeasties/shared'

export class InvalidTransactionStatusError extends DomainError {
  constructor() {
    super('INVALID_TRANSACTION_STATUS', true)
  }
}

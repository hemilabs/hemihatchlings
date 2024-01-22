import { DomainError } from '@bitbeasties/shared'

export class InvalidAddressError extends DomainError {
  constructor() {
    super('INVALID_ADDRESS', true)
  }
}

import { DomainError } from '@hemihatchlings/shared'

export class InvalidAddressError extends DomainError {
  constructor() {
    super('INVALID_ADDRESS', true)
  }
}

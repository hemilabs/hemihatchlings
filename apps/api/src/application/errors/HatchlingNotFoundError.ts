import { DomainError } from '@hemihatchlings/shared'

export class HatchlingNotFoundError extends DomainError {
  constructor() {
    super('HATCHLING_NOT_FOUND', true)
  }
}

import { DomainError } from '@hemihatchlings/shared'

export class BeastieNotFoundError extends DomainError {
  constructor() {
    super('BEASTIE_NOT_FOUND', true)
  }
}

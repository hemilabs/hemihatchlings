import { DomainError } from '@hemihatchlings/shared'

export class InvalidStageError extends DomainError {
  constructor() {
    super('INVALID_STAGE', true)
  }
}

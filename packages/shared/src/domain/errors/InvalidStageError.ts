import { DomainError } from '../base/DomainError'

export class InvalidStageError extends DomainError {
  constructor() {
    super('INVALID_STAGE', true)
  }
}

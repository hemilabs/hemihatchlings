import { DomainError } from '@bitbeasties/shared'

export class InvalidStageError extends DomainError {
  constructor() {
    super('INVALID_STAGE', true)
  }
}

import { DomainError } from '../base/DomainError'

export class InvalidElementError extends DomainError {
  constructor() {
    super('INVALID_ELEMENT', true)
  }
}

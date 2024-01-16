import { ValueObject } from "../base/ValueObject"
import { InvalidIdError } from "../errors/InvalidIdError"

interface IdProps {
  value: string
}

export class Id extends ValueObject<IdProps> {
  private constructor(id: string) {
    super({ value: id })
  }

  static create(id: string): Id {
    if (typeof id !== 'string' ||
        id.length < 3 ||
        id.length > 50) {
      throw new InvalidIdError()
    }

    return new Id(id)
  }

  get value(): string {
    return this.props.value
  }
}

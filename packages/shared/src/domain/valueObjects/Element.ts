import { InvalidElementError } from '../errors/InvalidElementError'
import { ElementEnum } from '../enums/ElementEnum'
import { ValueObject } from '../base/ValueObject'

interface ElementProps {
  value: ElementEnum
}

export class Element extends ValueObject<ElementProps> {
  private constructor(element: ElementEnum) {
    super({ value: element })
  }

  static create(element: ElementEnum): Element {
    if (typeof element !== 'string' ||
      !Object.values(ElementEnum).includes(element)) {
      throw new InvalidElementError()
    }

    return new Element(element)
  }

  get value(): string {
    return this.props.value
  }
}

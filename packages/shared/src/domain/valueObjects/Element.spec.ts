import { describe, it, expect } from 'vitest'
import { InvalidElementError } from '../errors/InvalidElementError'
import { Element } from './Element'
import { ElementEnum } from '../enums/ElementEnum'
import { ValueObject } from '../base/ValueObject'

describe('src/domain/valueObjects/Element', () => {
  it('should be defined', () => {
    expect(Element).toBeDefined()
  })

  it('should be an instance of ValueObject', () => {
    const element = Element.create(ElementEnum.Fire)

    expect(element).toBeInstanceOf(ValueObject)
  })

  describe('create', () => {
    it('should throw an error if the element is not a string', () => {
      const test = (): void => {
        // @ts-expect-error
        Element.create(123)
      }

      expect(test).toThrowError(InvalidElementError)
    })

    it('should throw an error if the element is not a valid', () => {
      const test = (): void => {
        // @ts-expect-error
        Element.create('not-a-valid-element')
      }

      expect(test).toThrowError(InvalidElementError)
    })

    it('should return a new Element instance if the element is valid', () => {
      const element = Element.create(ElementEnum.Water)

      expect(element).toBeInstanceOf(Element)
    })

    it('should set the element in the value property', () => {
      const expectedElement = ElementEnum.Grass
      const element = Element.create(expectedElement)

      expect(element.value).toBe(expectedElement)
    })
  })
})

import { describe, it, expect } from 'vitest'
import { InvalidElementError } from './InvalidElementError'
import { DomainError } from '../base/DomainError'

describe('src/domain/errors/InvalidElementError', () => {
  it('should be defined', () => {
    expect(InvalidElementError).toBeDefined()
  })

  it('should be instance of DomainError', () => {
    expect(new InvalidElementError()).toBeInstanceOf(DomainError)
  })

  describe('constructor', () => {
    it('should set error code to INVALID_ELEMENT', () => {
      const error = new InvalidElementError()

      expect(error.toObject().code).toBe('INVALID_ELEMENT')
    })

    it('should set exposable to true', () => {
      const error = new InvalidElementError()

      expect(error.toObject().exposable).toBeTruthy()
    })
  })
})

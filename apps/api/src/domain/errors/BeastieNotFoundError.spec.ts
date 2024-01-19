import { describe, it, expect } from 'vitest'
import { DomainError } from '@bitbeasties/shared'
import { BeastieNotFoundError } from './BeastieNotFoundError'

describe('src/domain/errors/BeastieNotFoundError', () => {
  it('should be defined', () => {
    expect(BeastieNotFoundError).toBeDefined()
  })

  it('should be instance of DomainError', () => {
    expect(new BeastieNotFoundError()).toBeInstanceOf(DomainError)
  })

  describe('constructor', () => {
    it('should set error code to BEASTIE_NOT_FOUND', () => {
      const error = new BeastieNotFoundError()

      expect(error.toObject().code).toBe('BEASTIE_NOT_FOUND')
    })

    it('should set exposable to true', () => {
      const error = new BeastieNotFoundError()

      expect(error.toObject().exposable).toBeTruthy()
    })
  })
})

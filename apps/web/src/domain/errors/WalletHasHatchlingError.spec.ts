import { describe, it, expect } from 'vitest'
import { WalletHasHatchlingError } from './WalletHasHatchlingError'

describe('src/domain/errors/WalletHasHatchlingError', () => {
  it('should be defined', () => {
    expect(WalletHasHatchlingError).toBeDefined()
  })

  it('should be an instance of Error', () => {
    const error = new WalletHasHatchlingError()

    expect(error).toBeInstanceOf(Error)
  })

  it('should set WALLET_HAS_HATCHLING as error message', () => {
    const error = new WalletHasHatchlingError()

    expect(error.message).toBe('WALLET_HAS_HATCHLING')
  })
})

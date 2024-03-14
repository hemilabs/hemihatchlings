import { describe, it, expect } from 'vitest'
import { WalletUnavailableError } from './WalletUnavailableError'

describe('src/domain/errors/WalletUnavailableError', () => {
  it('should be defined', () => {
    expect(WalletUnavailableError).toBeDefined()
  })

  it('should be an instance of Error', () => {
    const error = new WalletUnavailableError()

    expect(error).toBeInstanceOf(Error)
  })

  it('should set WALLET_UNAVAILABLE as error message', () => {
    const error = new WalletUnavailableError()

    expect(error.message).toBe('WALLET_UNAVAILABLE')
  })
})

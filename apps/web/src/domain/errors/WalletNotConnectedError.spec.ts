import { describe, it, expect } from 'vitest'
import { WalletNotConnectedError } from './WalletNotConnectedError'

describe('src/domain/errors/WalletNotConnectedError', () => {
  it('should be defined', () => {
    expect(WalletNotConnectedError).toBeDefined()
  })

  it('should be an instance of Error', () => {
    const error = new WalletNotConnectedError()

    expect(error).toBeInstanceOf(Error)
  })

  it('should set WALLET_NOT_CONNECTED as error message', () => {
    const error = new WalletNotConnectedError()

    expect(error.message).toBe('WALLET_NOT_CONNECTED')
  })
})

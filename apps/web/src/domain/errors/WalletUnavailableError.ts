export class WalletUnavailableError extends Error {
  constructor() {
    super('WALLET_UNAVAILABLE')
  }
}

export class WalletNotConnectedError extends Error {
  constructor() {
    super('WALLET_NOT_CONNECTED')
  }
}

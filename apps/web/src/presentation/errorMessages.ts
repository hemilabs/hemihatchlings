type ErrorMessages = {
  [key in string]: string
}

const errorMessages: ErrorMessages = {
  'WALLET_HAS_HATCHLING': 'You already have a Hemi Hatchlings NFT in your wallet',
  'WALLET_NOT_CONNECTED': 'You need to connect your wallet',
  'WALLET_UNAVAILABLE': 'No wallet available',
}

export default errorMessages

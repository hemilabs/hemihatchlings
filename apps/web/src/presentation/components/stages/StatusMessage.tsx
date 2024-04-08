import { StageEnum } from '@hemihatchlings/shared'

interface StatusMessageProps {
  stage: StageEnum
  account: string
  transactionHash: string
}

const explorerUrl = import.meta.env.VITE_CHAIN_BLOCK_EXPLORER_URL

function StatusMessage({
  stage,
  account,
  transactionHash
}:StatusMessageProps): JSX.Element {
  return (
    <>
      <div className={`${ stage != 'Adult' ? '' : 'hidden' }
        font-monaco text-sm text-white mt-2 text-center uppercase
        sm:text-base md:text-lg md:mt-4`}>
        Approaching
        { stage == StageEnum.Baby ? ' ETHEREUM ' : ' BITCOIN ' }
        Finality: 
        { stage == StageEnum.Baby ? ' EST. 15 MIN WAIT.' : ' EST. 90 MIN WAIT.' }
      </div>
      <div className={`${ stage === 'Adult' ? '' : 'hidden' }
        font-monaco text-sm text-white mt-2 text-center uppercase
        sm:text-base md:text-lg md:mt-4`}>
        ethereum & bitcoin finality achieved
      </div>

      <div className="font-monaco text-sm text-white mt-2 text-center
        sm:text-base md:text-lg md:mt-4">
        <div>Wallet: {account}</div>
        <div>Transaction: {transactionHash}</div>
      </div>
      <div className="text-white text-center underline">
        <a href={`${explorerUrl}/tx/${transactionHash}`} target='_blank'>
          View on block explorer
        </a>
      </div>
    </>
  )
}

export default StatusMessage

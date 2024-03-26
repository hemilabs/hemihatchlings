import { StageEnum } from '@hemihatchlings/shared'

interface StatusMessageProps {
  stage: StageEnum
  account: string
  transactionHash: string
}

function StatusMessage({
  stage,
  account,
  transactionHash
}:StatusMessageProps): JSX.Element {
  return (
    <>
      <div className="font-monaco text-sm text-white mt-2 text-center
        sm:text-base md:text-lg md:mt-4">
        <div>Wallet: {account}</div>
        <div>Transaction: {transactionHash}</div>
      </div>

      <div className={`${ stage != 'Adult' ? '' : 'hidden' }
        font-monaco text-sm text-white mt-2 text-center uppercase
        sm:text-base md:text-lg md:mt-4`}>
        Approaching { stage == StageEnum.Baby ? 'ETHEREUM' : 'BITCOIN' } Finality
      </div>
      <div className={`${ stage === 'Adult' ? '' : 'hidden' }
        font-monaco text-sm text-white mt-2 text-center uppercase
        sm:text-base md:text-lg md:mt-4`}>
        ethereum & bitcoin finality achieved
      </div>
    </>
  )
}

export default StatusMessage

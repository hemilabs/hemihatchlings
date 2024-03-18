interface StatusMessageProps {
  stage: string
}

function StatusMessage({ stage }:StatusMessageProps): JSX.Element {
  return (
    <>
      <div className={`${ stage != 'adult' ? '' : 'hidden' }
        font-monaco text-sm text-white mt-2 text-center uppercase
        sm:text-base md:text-lg md:mt-4`}>
        Approaching { stage == 'baby' ? 'ETHEREUM' : 'BITCOIN' } Finality
      </div>
      <div className={`${ stage === 'adult' ? '' : 'hidden' }
        font-monaco text-sm text-white mt-2 text-center uppercase
        sm:text-base md:text-lg md:mt-4`}>
        ethereum & bitcoin finality achieved
      </div>
    </>
  )
}

export default StatusMessage

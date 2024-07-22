import { useContext, useEffect, useState } from 'react'
import { servicesContext } from '../../context'
import Toast from './../Toast'
import Eggs from './Eggs'
import Hatchling from './Hatchling'
import StatusMessage from './StatusMessage'
import errorMessages from '../../errorMessages'
import { ElementEnum, Stage, StageEnum } from '@hemihatchlings/shared'

function Main(): JSX.Element {
  const [stage, setStage] = useState<StageEnum>(StageEnum.Egg)
  const [address, setAddress] = useState('')
  const [transactionHash, setTransactionHash] = useState('')
  const [element, setElement] = useState<ElementEnum>(ElementEnum.Fire)
  const [showToast, setShowToast] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const {
    findHatchlingService,
    createHatchlingService
  } = useContext(servicesContext)

  const createHatchling = async (element: ElementEnum) => {
    await createHatchlingService.execute({ element })
  }

  const openToast = (error: Error) => {
    const message = errorMessages[error.message] || 'Unexpected Error'
    
    setErrorMessage(message)
    setShowToast(true)

    setTimeout(() => {
      setShowToast(false)
    }, 5000)
  }

  const hatchEgg = async (element: ElementEnum) => {
    try {
      await createHatchling(element)

      setElement(element)
      setStage(StageEnum.Baby)
    }
    catch (error: any) {
      openToast(error)
    }
  }

  const fetchHatchling = async () => {
    const response = await findHatchlingService.execute()

    if (!response) {
      return;
    }

    const {
      stage,
      element,
      account,
      transactionHash
    } = response

    // @ts-ignore
    const stageEnum = StageEnum[stage]
    // @ts-ignore
    const elementEnum = ElementEnum[element]
    
    setStage(stageEnum)
    setElement(elementEnum)
    setAddress(account)
    setTransactionHash(transactionHash)
  }

  useEffect(() => {
    fetchHatchling()
  }, [stage])

  return (
  <>
    <Toast
      text={errorMessage}
      show={showToast}/>
    <div className={stage === StageEnum.Egg ? '' : 'hidden'}>
      <Eggs hatchEgg={hatchEgg}/>
    </div>

    <div className={stage != StageEnum.Egg ? '' : 'hidden'}>
      <Hatchling element={element} stage={stage}/>

      <div className="mt-4 sm:mt-8 lg:mt-12">
        <StatusMessage
          stage={stage}
          account={address}
          transactionHash={transactionHash}/>
      </div>
    </div>
  </>
  )
}

export default Main

import { useContext, useEffect, useState } from 'react'
import { servicesContext } from '../../context'
import Eggs from './Eggs'
import Hatchling from './Hatchling'
import StatusMessage from './StatusMessage'
import { ElementEnum, Stage, StageEnum } from '@hemihatchlings/shared'

function Main(): JSX.Element {
  const [stage, setStage] = useState<StageEnum>(StageEnum.Egg)
  const [address, setAddress] = useState('')
  const [transactionHash, setTransactionHash] = useState('')
  const [element, setElement] = useState<ElementEnum>(ElementEnum.Fire)

  const {
    findHatchlingService,
    createHatchlingService
  } = useContext(servicesContext)

  const createHatchling = async (element: ElementEnum) => {
    await createHatchlingService.execute({ element })
  }

  const hatchEgg = async (element: ElementEnum) => {
    await createHatchling(element)

    setElement(element)
    setStage(StageEnum.Baby)
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

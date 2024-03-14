import { useContext, useEffect, useState } from 'react'
import { servicesContext } from '../../context'
import ProgressBar from './ProgressBar'
import OptInButton from './OptInButton'
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
    connectWalletService,
    mintNFTService,
    getHatchlingStageService
  } = useContext(servicesContext)

  const connectWallet = async () => {
    const response = await connectWalletService.execute()

    setAddress(response.address)
  }

  const mintNFT = async () => {
    const response = await mintNFTService.execute()

    setTransactionHash(response.transactionHash)
  }

  const hatchEgg = async (element: ElementEnum) => {
    await connectWallet()
    await mintNFT()

    setElement(element)
    setStage(StageEnum.Baby)
  }

  const fetchHatchlingStage = async () => {
    const response = await getHatchlingStageService.execute({ transactionHash })
    const stageValue = response?.stage as keyof typeof StageEnum
    
    setStage(StageEnum[stageValue])
  }

  useEffect(() => {
    if (stage !== StageEnum.Egg) {
      fetchHatchlingStage()
    }
  }, [])

  return (
  <>
    <div className={stage === StageEnum.Egg ? '' : 'hidden'}>
      <Eggs hatchEgg={hatchEgg}/>
    </div>

    <div className={stage != StageEnum.Egg ? '' : 'hidden'}>
      <Hatchling element={element} stage={stage}/>

      <div className="mt-4 sm:mt-8 lg:mt-12">
        <OptInButton />
      </div>
      <div className="mt-4 sm:mt-8 lg:mt-12">
        <ProgressBar percent={8}/>
        {address}
        <StatusMessage stage={stage} />
      </div>
    </div>
  </>
  )
}

export default Main

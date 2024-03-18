import fireBaby from '../../../assets/fire-baby.png'
import waterBaby from '../../../assets/water-baby.png'
import grassBaby from '../../../assets/grass-baby.png'
import airBaby from '../../../assets/air-baby.png'

import fireAdult from '../../../assets/fire-adult.png'
import waterAdult from '../../../assets/water-adult.png'
import grassAdult from '../../../assets/grass-adult.png'
import airAdult from '../../../assets/air-adult.png'

import lockIcon from '../../../assets/lock-icon.png'
import { ElementEnum, StageEnum } from '@hemihatchlings/shared'

interface HatchlingProps {
  element: ElementEnum,
  stage: StageEnum
}

function Hatchling({ element, stage }:HatchlingProps): JSX.Element {
  const isBaby = (): Boolean => {
    return stage === StageEnum.Baby
  }

  const isAdult = (): Boolean => {
    return stage === StageEnum.Adult
  }

  return (
    <div className="flex flex-row justify-center">

      <div className='flex flex-col'>
        <div className={`${isBaby() ? 'blur' : ''}
          border w-96 items-center`}>
          <img src={fireBaby} alt="Fire Baby"
            className={`${element === ElementEnum.Fire ? '' : 'hidden'}`} />
          <img src={waterBaby} alt="Water Baby"
            className={`${element === ElementEnum.Water ? '' : 'hidden'}`} />
          <img src={grassBaby} alt="Grass Baby"
            className={`${element === ElementEnum.Grass ? '' : 'hidden'}`} />
          <img src={airBaby} alt="Air Baby"
            className={`${element === ElementEnum.Air ? '' : 'hidden'}`} />
        </div>
        <div className="font-monaco text-sm text-white mt-2 text-center
          sm:text-base md:text-lg md:mt-4">
          { isBaby() ? '🔄' : '✅' } HATCHING STAGE 1 
        </div>
      </div>
      <div className='flex flex-col'>
        <div className={`${!isAdult() ? 'blur' : ''}
          border w-96 items-center`}>
          <img src={fireAdult} alt="Fire Adult"
            className={`${element === ElementEnum.Fire ? '' : 'hidden'}`} />
          <img src={waterAdult} alt="Water Adult"
            className={`${element === ElementEnum.Water ? '' : 'hidden'}`} />
          <img src={grassAdult} alt="Grass Adult"
            className={`${element === ElementEnum.Grass ? '' : 'hidden'}`} />
          <img src={airAdult} alt="Air Adult"
            className={`${element === ElementEnum.Air ? '' : 'hidden'}`} />
        </div>

        <div className="font-monaco text-sm text-white mt-2 text-center
        sm:text-base md:text-lg md:mt-4">
          { !isAdult() ? '🔄' : '✅' } HATCHING STAGE 2 
        </div>
      </div>

      <img src={lockIcon}
          alt="Lock Icon"
          className='absolute m-auto top-0 bottom-0 left-0 right-0' />

    </div>
    
  )
}

export default Hatchling

import { useEffect, useMemo } from 'react'
import { ElementEnum, StageEnum } from '@hemihatchlings/shared'

import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import { ISourceOptions } from '@tsparticles/engine'

import lockIcon from '../../../assets/lock-icon.png'
import { getImage } from '../../ImageHandler'

const fireBaby = getImage('fire-baby.png')
const waterBaby = getImage('water-baby.png')
const grassBaby = getImage('grass-baby.png')
const airBaby = getImage('air-baby.png')

const fireAdult = getImage('fire-adult.png')
const waterAdult = getImage('water-adult.png')
const grassAdult = getImage('grass-adult.png')
const airAdult = getImage('air-adult.png')

interface HatchlingProps {
  element: ElementEnum,
  stage: StageEnum
}

function Hatchling({ element, stage }:HatchlingProps): JSX.Element {
  const isBaby = (): Boolean => {
    return stage === StageEnum.Baby
  }

  const isAdolescent = (): Boolean => {
    return stage === StageEnum.Adolescent
  }

  const isAdult = (): Boolean => {
    return stage === StageEnum.Adult
  }

  useEffect(() => {
    if (isBaby() || isAdolescent() || isAdult()) {
      //@ts-ignore
      confetti({
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        angle: 260,
        particleCount: 100,
        origin: { y: 0 },
        scalar: 2,
        shapes: ['square'],
        colors: ["BC6AAB", "C86280", "934CD4", "C03F5D"],
      })
    }
  }, [stage]);

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
          className={`${isAdult() ? 'hidden' : ''}
            absolute m-auto top-0 bottom-0 left-0 right-0`}/>

    </div>
    
  )
}

export default Hatchling

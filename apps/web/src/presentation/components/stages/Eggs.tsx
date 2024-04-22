import { useState } from 'react'
import { getImage } from '../../ImageHandler'

const fireEgg = getImage('fire-egg.png')
const waterEgg = getImage('water-egg.png')
const earthEgg = getImage('earth-egg.png')

import chevron from '../../../assets/chevron.svg'
import { ElementEnum } from '@hemihatchlings/shared'

interface EggsProps {
  hatchEgg: (element: ElementEnum) => void
}

function Eggs({ hatchEgg }:EggsProps): JSX.Element {
  const [active, setActive] = useState(0)

  const goPrevious = () => {
    setActive(active - 1)
  }

  const goNext = () => {
    setActive(active + 1)
  }

  return (
  <>
    <div className="flex flex-row justify-center gap-4 lg:gap-12">
      <button
        onClick={goPrevious}
        className='disabled:opacity-50 lg:hidden'
        disabled={active === 0}>
        <img src={chevron} className="w-32 rotate-180" alt="Go Left" />
      </button>

      <div className={active === 0 ? '' : 'hidden'}>
        <button onClick={() => hatchEgg(ElementEnum.Fire)}>
          <div className="border border-white transition duration-500 hover:scale-110">
            <img src={fireEgg} alt="Fire Egg" />
          </div>
          <div className="font-monaco text-sm text-white mt-2 text-left
            sm:text-base md:text-lg md:mt-4">
            01
          </div>
        </button>
      </div>

      <div className={`${active === 1 ? '' : 'hidden'} lg:block`}>
        <button onClick={() => hatchEgg(ElementEnum.Water)}>
          <div className="border border-white transition duration-500 hover:scale-110">
            <img src={waterEgg} alt="Water Egg" />
          </div>
          <div className="font-monaco text-sm text-white mt-2 text-left
            sm:text-base md:text-lg md:mt-4">
            02
          </div>
        </button>
      </div>

      <div className={`${active === 2 ? '' : 'hidden'} lg:block`}>
        <button onClick={() => hatchEgg(ElementEnum.Earth)}>
          <div className="border border-white transition duration-500 hover:scale-110">
            <img src={earthEgg} alt="Earth Egg" />
          </div>
          <div className="font-monaco text-sm text-white mt-2 text-left
            sm:text-base md:text-lg md:mt-4">
            03
          </div>
        </button>
      </div>

      <button
        onClick={goNext}
        className='disabled:opacity-50 lg:hidden'
        disabled={active === 2}>
        <img src={chevron} className="w-32" alt="Go Right" />
      </button>
    </div>

    <div className="flex flex-col items-center">
      <h2 className="font-monaco font-normal text-white text-lg mt-8
        sm:text-xl md:text-2xl lg:text-3xl lg:mt-12 xl:text-4xl">
        FREE MINT + GAS FEES
      </h2>
    </div>
  </>
  )
}

export default Eggs

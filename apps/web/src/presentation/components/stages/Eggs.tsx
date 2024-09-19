import { useState } from 'react'
import { getImage } from '../../ImageHandler'

const fireEgg = getImage('fire-egg.png')
const waterEgg = getImage('water-egg.png')
const earthEgg = getImage('earth-egg.png')

import chevron from '../../../assets/chevron.svg'
import { ElementEnum } from '@hemihatchlings/shared'

interface EggProps {
  index: number
  soldOut: boolean
  image: string
  onClick: () => void
}

const Egg = ({ index, soldOut, image, onClick }: EggProps) => (<>
  { soldOut ?
    <div className="border border-white transition duration-500 hover:scale-110 relative">
      <label className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        z-10 font-monaco text-xl text-white md:text-2xl xl:text-3xl">
        SOLD OUT
      </label>
      <img className="blur" src={image} alt="Fire Egg" />
    </div>
  : 
    <button onClick={onClick}>
      <div className="border border-white transition duration-500 hover:scale-110">
        <img src={image} alt="Fire Egg" />
      </div>
    </button>
  }
  <div className="font-monaco text-sm text-white mt-2 text-left
    sm:text-base md:text-lg md:mt-4">
    {index.toString().padStart(2, '0')}
  </div>
</>)

interface EggsProps {
  hatchEgg: (element: ElementEnum) => void
}

function Eggs({ hatchEgg }:EggsProps): JSX.Element {
  const [active, setActive] = useState(0)
  const soldOut = {
    fire:  import.meta.env.VITE_FIRE_SOLD_OUT === 'true',
    water: import.meta.env.VITE_WATER_SOLD_OUT === 'true',
    earth: import.meta.env.VITE_EARTH_SOLD_OUT === 'true'
  }

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
        <Egg index={1} soldOut={soldOut.fire} image={fireEgg} onClick={() => hatchEgg(ElementEnum.Fire)} />
      </div>

      <div className={`${active === 1 ? '' : 'hidden'} lg:block`}>
        <Egg index={2} soldOut={soldOut.water} image={waterEgg} onClick={() => hatchEgg(ElementEnum.Water)} />
      </div>

      <div className={`${active === 2 ? '' : 'hidden'} lg:block`}>
        <Egg index={3} soldOut={soldOut.earth} image={earthEgg} onClick={() => hatchEgg(ElementEnum.Earth)} />
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

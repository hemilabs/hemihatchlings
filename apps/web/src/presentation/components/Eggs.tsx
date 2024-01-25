import React from 'react'
import fireEgg from '../../assets/fire-egg.png'
import waterEgg from '../../assets/water-egg.png'
import grassEgg from '../../assets/grass-egg.png'

function Eggs(): JSX.Element {
  return (
  <>
    <div className="flex flex-row justify-center gap-16">
      <div className="p-8 border border-white bg-fire-yellow">
        <img src={fireEgg} className="" alt="Fire Egg" />
      </div>
      <div className="p-8 border border-white bg-water-blue">
        <img src={waterEgg} className="" alt="Water Egg" />
      </div>
      <div className="p-8 border border-white bg-grass-green">
        <img src={grassEgg} className="" alt="Grass Egg" />
      </div>
    </div>

    <div className="flex flex-col items-center mt-8">
      <h2 className="font-monaco font-normal text-white text-4xl mt-8">
        FREE MINT + GAS FEES
      </h2>
    </div>
  </>
  )
}

export default Eggs

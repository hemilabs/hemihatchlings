import plus from '../../assets/plus.svg'
import minus from '../../assets/minus.svg'
import HowItWorks from './HowItWorks'
import { useState } from 'react'

function Faq(): JSX.Element {
  const [showHistory, setShowHistory] = useState(false)

  const toogleHistory = () => {
    setShowHistory(!showHistory)
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="w-full max-w-screen-xl items-center p-8 border border-white">
        <div onClick={toogleHistory}
          className="flex flex-row justify-between">
          <h2 className="font-space font-bold text-white text-lg
            sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            HOW IT WORKS
          </h2>

          <img className={`${showHistory ? 'hidden' : ''} w-4 md:w-6 lg:w-8`}
            src={plus}
            alt='Plus Icon' />

          <img className={`${showHistory ? '' : 'hidden'} w-4 md:w-6 lg:w-8`}
            src={minus}
            alt='Minus Icon' />
        </div>
        <div className={`${showHistory ? '' : 'hidden'}`}>
          <HowItWorks />
        </div>
      </div>
      <div className="w-full max-w-screen-xl items-center p-8 border border-white">
        <a className='flex flex-row justify-between' href="https://github.com/hemilabs" target='_blank'>
          <h2 className="font-space font-normal text-white text-lg
            sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            ADD A FEATURE
          </h2>
          <img src={plus} className="w-4 md:w-6 lg:w-8" alt="Plus Icon" />
        </a>
      </div>
      <div className=" w-full max-w-screen-xl items-center p-8
        border border-white">
        <a className='flex flex-row justify-between' href="https://discord.gg/RyhaPp7NvQ" target='_blank'>
          <h2 className="font-space font-normal text-white text-lg
            sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            COMMUNITY
          </h2>
          <img src={plus} className="w-4 md:w-6 lg:w-8 " alt="Plus Icon" />
        </a>
      </div>
    </div>
  )
}

export default Faq

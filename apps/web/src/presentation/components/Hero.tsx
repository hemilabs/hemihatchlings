import React from 'react'
import logo from '../../assets/logo.svg'

function Hero(): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center h-24">
      <img src={logo} className="" alt="logo" />
      <h2 className="font-poller text-white text-center text-xs mt-4
        sm:text-lg md:text-xl lg:text-3xl">
        Learn how Ethereum & Bitcoin Finality Works.
      </h2>
    </div>
  )
}

export default Hero

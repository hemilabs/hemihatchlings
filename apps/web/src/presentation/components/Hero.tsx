import React from 'react'
import logo from '../../assets/logo.svg'

function Hero(): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center h-36">
      <img src={logo} className="" alt="logo" />
      <h2 className="font-poller text-white text-3xl mt-8">
        Learn how Ethereum & Bitcoin Finality Works.
      </h2>
    </div>
  )
}

export default Hero

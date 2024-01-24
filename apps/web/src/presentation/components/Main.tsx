import React from 'react'
import Header from './Header'
import Hero from './Hero'
import Eggs from './Eggs'
import Faq from './Faq'

function Main(): JSX.Element {
  return (
    <div className="flex flex-col">
      <Header />
      <Hero />
      <div className="mt-12">
        <Eggs />
      </div>
      <div className="mt-12">
        <Faq />
      </div>
    </div>
  )
}

export default Main

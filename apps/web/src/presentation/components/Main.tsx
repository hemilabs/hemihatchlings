import React from 'react'
import Header from './Header'
import Hero from './Hero'
import Eggs from './Eggs'
import Faq from './Faq'

function Main(): JSX.Element {
  return (
    <div className="flex flex-col container">
      <Header />
      <div className="mt-4 sm:mt-8 lg:mt-12">
        <Hero />
      </div>
      <div className="mt-4 sm:mt-8 lg:mt-20">
        <Eggs />
      </div>
      <div className="mt-8 sm:mt-8 mb-8 lg:mt-16">
        <Faq />
      </div>
    </div>
  )
}

export default Main

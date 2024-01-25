import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from './components/Main'
import './index.css'
import { servicesContext, defaultValue } from './context'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <servicesContext.Provider value={ defaultValue }>
      <Main />
    </servicesContext.Provider>
  </React.StrictMode>
)

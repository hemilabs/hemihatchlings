import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from './presentation/components/Main'
import './index.css'
import {
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

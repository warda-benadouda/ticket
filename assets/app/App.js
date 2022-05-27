import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Home from './modules/Home'
import RoutesPage from './RoutesPage'

function App() {
  return (
     <BrowserRouter>
        <RoutesPage/>
     </BrowserRouter>
  )
}

export default App
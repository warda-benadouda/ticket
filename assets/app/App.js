import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../redux/store'
import Home from './modules/Home'
import RoutesPage from './RoutesPage'

function App() {
  return (
   <Provider store={store}>
     <BrowserRouter>
        <RoutesPage/>
     </BrowserRouter>
   </Provider>
  )
}

export default App
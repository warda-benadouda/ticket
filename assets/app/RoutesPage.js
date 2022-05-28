import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Login from './modules/Auth/pages/Login'


function RoutesPage() {
  // si autoriser ( user exist ) alors base page else stay in login page 
  return (
    <Routes>
       
        <Route
            path="/"
            element={<Login/>}
        />  
    </Routes>
  )
}

export default RoutesPage
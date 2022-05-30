import React from 'react'
import { useSelector } from 'react-redux'
import { Routes , Route } from 'react-router-dom'
import Login from './modules/Auth/pages/Login'
import  { reducer as auth } from "../app/modules/Auth/_redux/reducer";
import Company from './modules/Company/pages/Company'
import Departement from './modules/Departement/pages/Departement'
import Aside from './modules/start/pages/Aside'
import Ticket from './modules/Ticket/pages/Ticket'
import User from './modules/User/pages/User'


function RoutesPage() {
    
  const isAuthorized =  useSelector( state => state.auth.user );

  return (
    <Routes>
       {/* { isAuthorized ?  */}
         {/* <> */}
             
          <Route
              path="/start"
              element={<Aside/>}
          /> 
          <Route
              path="/companies"
              element={<Company/>}
          /> 
          <Route
            path="/departements"
            element={<Departement/>}
          /> 
          <Route
            path="/users"
            element={<User/>}
          /> 
          <Route
            path="/tickets"
            element={<Ticket/>}
          /> 
         {/* </> */}
       :
        <Route
            path="/login"
            element={<Login/>}
        />  
       {/* } */}
    </Routes>
  )
}

export default RoutesPage
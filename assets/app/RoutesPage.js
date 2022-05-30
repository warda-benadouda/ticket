import React from 'react'
import { useSelector } from 'react-redux'
import { Routes , Route, Navigate } from 'react-router-dom'
import Login from './modules/Auth/pages/Login'
import  { reducer as auth } from "../app/modules/Auth/_redux/reducer";
import Company from './modules/Company/pages/Company'
import Departement from './modules/Departement/pages/Departement'
import Aside from './modules/start/pages/Aside'
import Ticket from './modules/Ticket/pages/Ticket'
import User from './modules/User/pages/User'
import ErrorPage from './ErrorPage';
import Layout from './Layout';


function RoutesPage() {
    
  return (
      <Routes>
          <Route path="*" element={<ErrorPage />} />
              <Route element={<Layout/>}> 
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
              </Route>
          <Route
              path="/"
              element={<Login/>}
              />
          {/* <Route
             path="*"
            element={<Navigate to="/" replace />}
          /> */}
      </Routes>
  )
}

export default RoutesPage
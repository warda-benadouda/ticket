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
import TicketEdit from './modules/Ticket/components/TicketEdit';
import CompanyEdit from './modules/Company/components/CompanyEdit';
import DepartementEdit from './modules/Departement/components/DepartementEdit';
import UserEdit from './modules/User/components/UserEdit';
import DoneTasks from './modules/Ticket/pages/DoneTasks';
import Logout from './modules/Auth/pages/Logout';



function RoutesPage() {
    
  return (
      <Routes>

          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<Login/>} />
          <Route path="/logout" element={<Logout/>} /> 

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
                    path="tickets"
                    element={<Ticket/>}
                  /> 
                  <Route
                    path="tickets/edit/:id"
                    element={<TicketEdit/>}
                  /> 
                  <Route
                    path="companies/edit/:id"
                    element={<CompanyEdit/>}
                  /> 
                  <Route
                    path="departements/edit/:id"
                    element={<DepartementEdit/>}
                  />
                   <Route
                    path="users/edit/:id"
                    element={<UserEdit/>}
                  /> 
                   <Route
                    path="/finished-tasks"
                    element={<DoneTasks/>}
                  /> 
               
          </Route>

      </Routes>
  )
}

export default RoutesPage
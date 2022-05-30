import React from 'react'
import Aside from './modules/start/pages/Aside'
import { Outlet } from 'react-router-dom';

function Layout() {

  return (
    <div>
        <Aside/>
        <Outlet />
    </div>
  )
}

export default Layout
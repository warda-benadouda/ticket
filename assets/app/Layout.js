import React from 'react'
import Aside from './modules/start/pages/Aside'
import { Outlet } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div>
        <Aside/>
        {children}
    </div>
  )
}

export default Layout
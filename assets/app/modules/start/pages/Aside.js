import React, { useEffect } from 'react'
import { Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import SVG from "react-inlinesvg";
import { Card } from '../../../components/Card';
import { ToolBar } from '../../../components/ToolBar';
import { Item } from '../../../components/Item';
import { useDispatch, useSelector } from 'react-redux';

function Aside() {

  const { user }= useSelector(state => state.auth.user);
  let isSuperAdmin = user.roles.includes("ROLE_SUPER_ADMIN");
  let isAdmin = user.roles.includes("ROLE_ADMIN");

  return (

    <>
      <div className="sidebar">
         {/* <h1 className="">Logo</h1> */}
         <div className='pt-5'>
          { isSuperAdmin  &&  
           < >
              <NavLink
                  
                    to="/companies"
                    >
                  <SVG
                  className="mr-2"
                  src={"/media/svg/Building.svg"}
                />
                <span >Entreprises</span>
              </NavLink>
              <NavLink
                  to="/departements"
                    >
                  <SVG
                  className="mr-2 selected"
                  src={"/media/svg/Commode2.svg"}
                />
                <span >Departements</span>
              </NavLink>
              <NavLink
                  to="/users"
                    >
                  <SVG
                  className="mr-2"
                  src={"/media/svg/Groupe.svg"}
                />
                <span >Utilisateurs</span>
              </NavLink>
           </>
          }   
              <NavLink
                  to="/tickets"
                    >
                  <SVG
                  className="mr-2 "
                  src={"/media/svg/Ticket.svg"}
                />
                <span >Tickets</span>
              </NavLink>
             
         </div>
        
      </div>
    </>

  )
}

export default Aside





































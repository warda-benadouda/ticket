import React from 'react'
import { Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import SVG from "react-inlinesvg";
import { Card } from '../../../components/Card';
import { ToolBar } from '../../../components/ToolBar';
import { Item } from '../../../components/Item';

function Aside() {

  const Toolbar = () => (
    <ToolBar>

        <Item title={"Liste"}  tooltip={"Liste des tickets "} />
        <Item title={"Ajouter"}  tooltip={" Ajouter des tickets"} />

    </ToolBar>
);

  return (

    <>
      <div className="sidebar">
         {/* <h1 className="">Logo</h1> */}
         <div className='pt-5'>
             
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

      <div className="content">
         <Card title={"Entreprises"}  toolbar={<Toolbar />} >
  
         </Card>
      </div>
    </>

  )
}

export default Aside




































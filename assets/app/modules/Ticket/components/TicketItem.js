import React from 'react'
import { Th } from '../../../components/table/Th';
import { Td } from '../../../components/table/Td';
import SVG from "react-inlinesvg";
import { NavLink } from 'react-bootstrap';
import { IconButton } from '../../../components/IconButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  updateTicket} from '../_redux/api';
import { actions } from '../_redux/actions';

function TicketItem({  ticket , index, setDeletedTicket , setDelivertask} ) {

   const { label , id , taskDescription , deadline ,  state} = ticket;
//    const { email , firstName , lastName } = user;
   
   
   const { user } = useSelector(state => state.auth.user);
   const navigate = useNavigate();


   let isUser = user.roles.includes('ROLE_USER');
   let isAdmin = user.roles.includes('[ROLE_ADMIN]');
   let isSuperAdmin = user.roles.includes('[ROLE_SUPER_ADMIN]');
   const dispatch = useDispatch();

   const getState=( state) => {

        switch(state) {
            case "0" :
                return "En attente"
            case "1" :
                return "En cours"
            case "2" : 
                return "Terminé"
            default :
                 return "/"
        }
   }

   const userActions = (state) =>  {
        switch(state) {
            case "0" :
                return (
                <button type="button" className="btn btn-outline-success" onClick={() => updateTicketState("1") }>Commencer</button>);
            case "1" :
                return(
                 <button type="button" className="btn btn-outline-info"  
                 onClick={() => {
                    //  updateTicketState("2") 
                    setDelivertask(true)
                    }}
                 >Envoyer  </button>);
            default :
                return ""
        }

   }

   const updateTicketState = (taskState) => {

       updateTicket(id , { state : taskState })
       .then( response => { 
            dispatch(actions.requestTickets(user.id))
       })
       .catch( errors => { console.log(errors)} )
   }

  return (
    <tr>
        <Td className="" displayFrom={"sm"}>
            <div className=" d-flex justify-content-center">
                <SVG
                  className="mr-2 "
                  src={"/media/svg/Ticket.svg"}
                />
            </div>
        </Td>
        <Td>
            <NavLink
                to={`#`}
                className={`text-dark-75 font-weight-bolder d-block font-size-lg  text-dark`}
            >
                {label}
            </NavLink>
        </Td>
        <Td>
            <NavLink
                to={`#`}
                className={`text-dark-75 font-weight-bolder d-block font-size-lg text-dark `}
            >
              { ( ticket.user )&& ticket.user.firstName +  ticket.user.lastName }
            </NavLink>
        </Td>
        <Td>
            <NavLink
                to={`#`}
                className={`text-dark-75 font-weight-bolder d-block font-size-lg  text-dark`}
            >
              {getState(state)}
            </NavLink>
        </Td>

        {  ( isAdmin || isSuperAdmin ) &&
            <Td className="pr-0 text-center" >
                <IconButton
                    onClick={() => navigate(`/tickets/edit/${id}`)}
                    tooltip="Modifier"
                    src="/media/svg/Edit.svg"
                />

                <IconButton
                    onClick={() =>  setDeletedTicket(ticket)}
                    tooltip="Supprimer"
                    iconPath="/media/svg/Trash.svg"
                />
            </Td>
        }
        { 
           isUser && 
           
            <Td className="pr-0 text-center" >  
                    {userActions(state)}
             </Td>
        
        }

    </tr>
  )
}

export default TicketItem
import React from 'react'
import { Th } from '../../../components/table/Th';
import { Td } from '../../../components/table/Td';
import SVG from "react-inlinesvg";
import { NavLink } from 'react-bootstrap';
import { IconButton } from '../../../components/IconButton';
import { useNavigate } from 'react-router-dom';

function TicketItem({  ticket , index, setDeletedTicket} ) {

   const { label , id , taskDescription , deadline , user , state} = ticket;
   const { email , firstName , lastName } = user;
   const navigate = useNavigate();


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
              {firstName +  lastName }
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

    </tr>
  )
}

export default TicketItem
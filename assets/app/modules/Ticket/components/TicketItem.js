import React from 'react'
import { Th } from '../../../components/table/Th';
import { Td } from '../../../components/table/Td';
import SVG from "react-inlinesvg";
import { NavLink } from 'react-bootstrap';
import { IconButton } from '../../../components/IconButton';
import { useNavigate } from 'react-router-dom';

function TicketItem({  ticket , index, setDeletedTicket} ) {

   const { label , taskDescription , deadline , user , state} = ticket;
   const navigate = useNavigate();
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
               user
            </NavLink>
        </Td>
        <Td>
            <NavLink
                to={`#`}
                className={`text-dark-75 font-weight-bolder d-block font-size-lg  text-dark`}
            >
               etat
            </NavLink>
        </Td>

        <Td className="pr-0 text-center" >
            <IconButton
                onClick={() => navigate('/tickets/edit')}
                tooltip="Modifier"
                src="/media/svg/Edit.svg"
            />

            <IconButton
                // onClick={() => setDeletedQuiz(quiz)}
                tooltip="Supprimer"
                iconPath="/media/svg/Trash.svg"
            />
        </Td>

    </tr>
  )
}

export default TicketItem
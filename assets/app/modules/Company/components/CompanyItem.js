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

function CompanyItem({company}) {

    const { name , description } = company;

  return (
    <tr>
    <Td className="" displayFrom={"sm"}>
        <div className=" d-flex justify-content-center">
            <SVG
              className="mr-2 "
              src={"/media/svg/Building.svg"}
            />
        </div>
    </Td>
    <Td>
        <span  className={`text-dark-75 font-weight-bolder d-block font-size-lg  text-dark`} >{name} </span>
    </Td>
    <Td>
        <span  className={`text-dark-75 font-weight-bolder d-block font-size-lg  text-dark`} >{description} </span>
    </Td>
    
        <Td className="pr-0 text-center" >
            <IconButton
                // onClick={() => navigate(`/tickets/edit/${id}`)}
                tooltip="Modifier"
                src="/media/svg/Edit.svg"
                variant="primary"
            />

            <IconButton
                // onClick={() =>  setDeletedTicket(ticket)}
                tooltip="Supprimer"
                iconPath="/media/svg/Trash.svg"
            />
        </Td>
 
</tr>
  )
}

export default CompanyItem
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

function UserItem({ user , setDeletedUser }) {

    const { firstName , lastName, departement , id } = user;
    const { company } = departement;
    const navigate = useNavigate();

  return (
    <tr>
    <Td className="" displayFrom={"sm"}>
        <div className=" d-flex justify-content-center">
           <img src={"/media/svg/Groupe.svg"} className="filter-primary"/>
        </div>
    </Td>
    <Td>
        <span  className={`text-dark-75 font-weight-bolder d-block font-size-lg  text-dark`} >{firstName} </span>
    </Td>
    <Td>
        <span  className={`text-dark-75 font-weight-bolder d-block font-size-lg  text-dark`} >{lastName} </span>
    </Td>
    <Td>
        <span  className={`text-dark-75 font-weight-bolder d-block font-size-lg  text-dark`} >{departement.name} </span>
    </Td>
    <Td>
        <span  className={`text-dark-75 font-weight-bolder d-block font-size-lg  text-dark`} >{company.name} </span>
    </Td>
    
        <Td className="pr-0 text-center" >
            <IconButton
                onClick={() => navigate(`/users/edit/${id}`)}
                tooltip="Modifier"
                src="/media/svg/Edit.svg"
                filter="filter-blue"
            />

            <IconButton
                onClick={() =>  setDeletedUser(user)}
                tooltip="Supprimer"
                iconPath="/media/svg/Trash.svg"
                filter="filter-red" 
            />
        </Td>
 
</tr>
  )
}

export default UserItem
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../../components/Loading';
import { Table } from '../../../components/table/Table';
import { Th } from '../../../components/table/Th';
import { actions } from '../_redux/actions';
import UserItem from './UserItem';
import UserDelete from './UserDelete';

function UsersList() {


    const dispatch = useDispatch();
    const users = useSelector(state => state.user.users);
    const [deletedUser, setDeletedUser] = useState(false);

     let filter = "";

    useEffect(() => {
        dispatch(actions.requestUsers(filter));
       
        
    }, []);

  return (
    <div className="card-body pt-0 pb-4">

        <Table>
            <thead>
                <tr>
                    <th className="pl-0" minwidth={50} />
                    <Th minwidth={150} >Nom</Th>
                    <Th displayFrom="md" minwidth={120} >Prénom</Th>
                    <Th displayFrom="md" minwidth={120} >département</Th>
                    <Th minwidth={50} className="text-center" >Actions</Th>
                </tr>
            </thead>
                <tbody>
                    { users ?
                        users.length > 0 ?
                            (users.map(( user, index) => 
                            <UserItem user={user} key={index} setDeletedUser={setDeletedUser} />))
                            :
                            <tr>
                                <td />
                                <td className="col-md-12">  Aucun utilisateur trouvé </td>
                            </tr>
                        :
                        <tr><td /><td><Loading/></td></tr>

                    }
                  
                </tbody>
        </Table> 
        {deletedUser && <UserDelete user={deletedUser} show={deletedUser} handleShow={setDeletedUser} />}
        
    </div>
    
  )
}

export default UsersList





import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../../components/Loading';
import { Table } from '../../../components/table/Table';
import { Th } from '../../../components/table/Th';
import { actions } from '../_redux/actions';
import DepartementItem from './DepartementItem';
import DepartementDelete from './DepartementDelete';

function DepartementsList() {

    const dispatch = useDispatch();
    const departements = useSelector(state => state.departement.departements);
    const [deletedDepartement, setDeletedDepartement] = useState(false);

     let filter = "";

    useEffect(() => {
        dispatch(actions.requestDepartements(filter));
    }, []);

  return (
    <div className="card-body pt-0 pb-4">

        <Table>
            <thead>
                <tr>
                    <th className="pl-0" minwidth={50} />
                    <Th minwidth={150} >Nom</Th>
                    <Th minwidth={50}  >Entreprise</Th>
                    <Th minwidth={50} className="text-center" >Action</Th>
                </tr>
            </thead>
                <tbody>
                    { departements ?
                       departements.length > 0 ?
                            (departements.map(( departement, index) => 
                            <DepartementItem  departement={departement} key={index} setDeletedDepartement={setDeletedDepartement} />))
                            :
                            <tr>
                                <td />
                                <td className="col-md-12">  Aucun Departement trouvé </td>
                            </tr>
                        :
                        <tr><td /><td><Loading/></td></tr>

                    }
                  
                </tbody>
        </Table> 
        {deletedDepartement && <DepartementDelete departement={deletedDepartement} show={deletedDepartement} handleShow={setDeletedDepartement} />}
        
    </div>
    
  )
}

export default DepartementsList





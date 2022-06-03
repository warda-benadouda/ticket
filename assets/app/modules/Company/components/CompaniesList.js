import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../../components/Loading';
import { Table } from '../../../components/table/Table';
import { Th } from '../../../components/table/Th';
import CompanyItem from './CompanyItem';
import { actions } from '../_redux/actions';
import CompanyDelete from './CompanyDelete';

function CompaniesList() {


    const dispatch = useDispatch();
    const companies = useSelector(state => state.company.companies);
    const [deletedCompany, setDeletedCompany] = useState(false);

     let filter = "";

    useEffect(() => {
        dispatch(actions.requestCompanies(filter));
       
        
    }, []);

  return (
    <div className="card-body pt-0 pb-4">

        <Table>
            <thead>
                <tr>
                    <th className="pl-0" minwidth={50} />
                    <Th minwidth={150} >Nom</Th>
                    <Th displayFrom="md" minwidth={120} >Description</Th>
                    <Th minwidth={50} className="text-center" >Actions</Th>
                </tr>
            </thead>
                <tbody>
                    { companies ?
                        companies.length > 0 ?
                            (companies.map(( company, index) => 
                            <CompanyItem company={company} key={index} setDeletedCompany={setDeletedCompany} />))
                            :
                            <tr>
                                <td />
                                <td className="col-md-12">  Aucune entreprise trouvée </td>
                            </tr>
                        :
                        <tr><td /><td><Loading/></td></tr>

                    }
                  
                </tbody>
        </Table> 
        {deletedCompany && <CompanyDelete company={deletedCompany} show={deletedCompany} handleShow={setDeletedCompany} />}
        
    </div>
    
  )
}

export default CompaniesList





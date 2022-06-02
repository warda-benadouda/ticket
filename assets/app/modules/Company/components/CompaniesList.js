import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../../components/Loading';
import { Table } from '../../../components/table/Table';
import { Th } from '../../../components/table/Th';
import CompanyItem from './CompanyItem';
import { actions } from '../_redux/actions';

function CompaniesList() {


    const {user } = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const companies = useSelector(state => state.company.companies);

     let filter = "";

    useEffect(() => {
        dispatch(actions.requestCompanies(filter));
       
        
    }, []);

  return (
    <div className="card-body pt-0 pb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
                <div >
                    <h3 className="font-weight-bold mb-6">Liste des  entreprise</h3>
                </div>
        </div>

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
                            <CompanyItem company={company} key={index} />))
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
        
    </div>
    
  )
}

export default CompaniesList





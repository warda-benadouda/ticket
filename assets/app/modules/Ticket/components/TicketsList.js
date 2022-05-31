import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../../components/Loading';
import { Table } from '../../../components/table/Table';
import { Th } from '../../../components/table/Th';
import { actions } from '../_redux/actions';
import TicketDelete from './TicketDelete';
import TicketItem from './TicketItem';

function TicketsList() {

    const user = useSelector(state => state.auth.user);
    
    const [deletedticket, setDeletedTicket] = useState(false);
    // const [tickets , settickets] = useState([]);

    let filter = ""

    const dispatch = useDispatch();
    const tickets = useSelector(state => state.ticket.tickets);


    console.log(tickets , "tiiickets");

    useEffect(() => {
      
        dispatch(actions.requestTickets(filter));

    }, []);




  return (
    <div className="card-body pt-0 pb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
                <div >
                    <h3 className="font-weight-bold mb-6">Liste des tickets </h3>
                </div>

                <div className='d-flex align-items-center'>
                   
                    <button className="btn btn-sm btn-danger" >
                        <i className="fa fa-search" aria-hidden="true" /> Recherche
                    </button>

                </div>
        </div>
        <Table>
            <thead>
                <tr>
                    <th className="pl-0" minwidth={50} />
                    <Th minwidth={150} >Tickets</Th>
                    <Th displayFrom="md" minwidth={120} >affecter a </Th>
                    <Th displayFrom="md" minwidth={120} >etat</Th>
                    <Th minwidth={50} className="text-center" >actions</Th>
                </tr>
            </thead>
                <tbody>
                    { tickets ?
                        tickets.length > 0 ?
                            (tickets.map(( ticket, index) => <TicketItem ticket={ticket} key={index} setDeletedTicket={setDeletedTicket} />))
                            :
                            <tr>
                                <td />
                                <td className="col-md-12">  Aucun ticket trouvé </td>
                            </tr>
                        :
                        <tr><td /><td><Loading/></td></tr>

                    }
                    {deletedticket && <TicketDelete ticket={deletedticket} show={deletedticket} handleShow={setDeletedTicket} />}

                </tbody>
        </Table>
    </div>
    
  )
}

export default TicketsList
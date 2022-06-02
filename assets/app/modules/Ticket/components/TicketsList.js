import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../../components/Loading';
import { Table } from '../../../components/table/Table';
import { Th } from '../../../components/table/Th';
import { actions } from '../_redux/actions';
import TicketDelete from './TicketDelete';
import TicketItem from './TicketItem';
import SVG from "react-inlinesvg";
import DeliverTicket from './DeliverTicket';

function TicketsList() {

    const {user } = useSelector(state => state.auth.user);
    const { id } = user;
    const [deletedticket, setDeletedTicket] = useState(false);
    const [ delivertask , setDelivertask] = useState(false);
    const [ filter , setFilter] = useState('');
    // let filter = ""

    const dispatch = useDispatch();
    const tickets = useSelector(state => state.ticket.tickets);



    let isUser = user.roles.includes('ROLE_USER');
    let isAdmin = user.roles.includes('[ROLE_ADMIN]');


    useEffect(() => {
        dispatch(actions.requestTickets(filter));
    }, []);

    useEffect(() => {
        filter && dispatch(actions.requestTickets("?state=" +filter));
    }, [filter]);
    
  return (
    <div className="card-body pt-0 pb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
                <div >
                    <h3 className="font-weight-bold mb-6">Liste des tickets </h3>
                </div>

                <form>
                    <div className='d-flex form-group align-items-center'>
                        <label className="mr-2 d-flex "> 
                        <SVG className="mr-2 "src={"/media/svg/Search.svg"}/>Recherche</label>
                        <select className="form-control" onClick={ (e) => setFilter( e.target.value)}>
                            <option value="">Recherche par etat</option>
                            <option value="0">En attente</option>
                            <option value="1">en cours</option>
                            <option value="2">Terminer</option>
                        </select>
                    </div>
                </form>
        </div>
        <Table>
            <thead>
                <tr>
                    <th className="pl-0" minwidth={50} />
                    <Th minwidth={150} >Tickets</Th>
                    { isUser ? 
                      <Th displayFrom="md" minwidth={120} >Creer par</Th>
                     :<Th displayFrom="md" minwidth={120} >Affecter a </Th>
                    }
                    
                    <Th displayFrom="md" minwidth={120} >Etat</Th>
                    <Th minwidth={50} className="text-center" >Actions</Th>
                </tr>
            </thead>
                <tbody>
                    { tickets ?
                        tickets.length > 0 ?
                            (tickets.map(( ticket, index) => 
                            <TicketItem ticket={ticket} key={index} setDeletedTicket={setDeletedTicket} setDelivertask={setDelivertask} />))
                            :
                            <tr>
                                <td />
                                <td className="col-md-12">  Aucun ticket trouvé </td>
                            </tr>
                        :
                        <tr><td /><td><Loading/></td></tr>

                    }
                    {deletedticket && <TicketDelete ticket={deletedticket} show={deletedticket} handleShow={setDeletedTicket} />}
                    {delivertask && <DeliverTicket show={delivertask} handleShow={setDelivertask} delivertask={delivertask} /> }
                </tbody>
        </Table>
    </div>
    
  )
}

export default TicketsList
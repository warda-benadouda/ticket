import React from 'react'
import {Button, Modal} from "react-bootstrap";
import { useDispatch } from 'react-redux';
import {  updateTicket} from '../_redux/api';
import { actions } from '../_redux/actions';


function DeliverTicket({handleShow, show , delivertask}) {


    const dispatch = useDispatch();

    const SendFileTicket = () => {
          
        updateTicket(delivertask.id , { state : "2" })
        .then( response => { 
             dispatch(actions.requestTickets())
        })
        .catch( errors => { console.log(errors)} )
    }

  return (
    <Modal show={show} onHide={() => handleShow(false)}>
            <Modal.Header>
                <Modal.Title> 
                    En cliquant sur Envoyer , X var recevoir 
                    un email contenant le ficher.
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex justify-content-end '>
                  <button
                      onClick={() => handleShow(false)}
                      className="btn btn-secondary"
                  >
                      Annuler
                  </button>
                  <button
                      className={`btn btn-info ml-2`}
                      onClick={() => SendFileTicket()}
                  >
                      Envoyer
                  </button>
                </div>
            </Modal.Body>
      </Modal>
  )
}

export default DeliverTicket
import React from 'react'
import {Button, Modal} from "react-bootstrap";
import {  updateTicket} from '../_redux/api';

function DeliverTicket({handleShow, show}) {

    const SendFileTicket = () => {
            //call Backend Action (swiftmailer) 
            // if 200 closse model , change state
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
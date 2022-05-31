import React from 'react'
import {Button, Modal} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { deleteTicket } from '../_redux/api';


function TicketDelete({ ticket, handleShow, show}) {

    const navigate = useNavigate();

    const deleteTicket = () => {
        deleteTicket(ticket.id)
        .then(response => {
            navigate(`/tickets`)
        })
        .catch(errors => {

        });
    }

  return (
    <Modal show={show} onHide={() => handleShow(false)}>
            <Modal.Header>
                <Modal.Title> voulez-vous vraiment supprimer ce ticket ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex justify-content-end '>
                  <button
                      onClick={() => handleShow(false)}
                      className="btn btn-info"
                  >
                      Annuler
                  </button>
                  <button
                      className={`btn btn-danger ml-2`}
                      onClick={() => deleteTicket()}
                  >
                      Supprimer
                  </button>
                </div>
            </Modal.Body>
      </Modal>
  )
}

export default TicketDelete
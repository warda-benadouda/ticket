import React from 'react'
import {Button, Modal} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import {  useDispatch } from "react-redux";
import { actions } from '../_redux/actions';
import { deleteUser } from '../_redux/api';


function UserDelete({ user , handleShow, show}) {

    const { id } = user;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const TodeleteUser = () => {
      deleteUser(id)
        .then(response => {
            dispatch(actions.deleteUser(departement))
            navigate(`/users`)
            handleShow(false)
        })
        .catch(errors => {
            console.log("errors" , errors)
        });
    }

  return (
    <Modal show={show} onHide={() => handleShow(false)}>
            <Modal.Header>
                <Modal.Title> voulez-vous vraiment supprimer cet utilisateur?</Modal.Title>
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
                      onClick={() => TodeleteUser()}
                  >
                      Supprimer
                  </button>
                </div>
            </Modal.Body>
      </Modal>
  )
}

export default UserDelete
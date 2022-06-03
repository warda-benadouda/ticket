import React from 'react'
import {Button, Modal} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import {  deleteDepartement } from '../_redux/api';
import {  useDispatch } from "react-redux";
import { actions } from '../_redux/actions';


function DepartementDelete({ departement, handleShow, show}) {

    const { id } = departement;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const TodeleteDepartement = () => {
      deleteDepartement(id)
        .then(response => {
            dispatch(actions.deleteDepartement(departement))
            navigate(`/departements`)
            handleShow(false)
        })
        .catch(errors => {
            console.log("errors" , errors)
        });
    }

  return (
    <Modal show={show} onHide={() => handleShow(false)}>
            <Modal.Header>
                <Modal.Title> voulez-vous vraiment supprimer ce departement?</Modal.Title>
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
                      onClick={() => TodeleteDepartement()}
                  >
                      Supprimer
                  </button>
                </div>
            </Modal.Body>
      </Modal>
  )
}

export default DepartementDelete
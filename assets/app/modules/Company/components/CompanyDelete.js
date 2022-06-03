
import React from 'react'
import {Button, Modal} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { deleteCompany } from '../_redux/api';
import {  useDispatch } from "react-redux";
import { actions } from '../_redux/actions';


function CompanyDelete({ company, handleShow, show}) {

    const { id } = company;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const TodeleteCompany = () => {
        deleteCompany(id)
        .then(response => {
            dispatch(actions.deleteCompany(company))
            navigate(`/companies`)
            handleShow(false)
        })
        .catch(errors => {
            console.log("errors" , errors)
        });
    }

  return (
    <Modal show={show} onHide={() => handleShow(false)}>
            <Modal.Header>
                <Modal.Title> voulez-vous vraiment supprimer cette entreprise?</Modal.Title>
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
                      onClick={() => TodeleteCompany()}
                  >
                      Supprimer
                  </button>
                </div>
            </Modal.Body>
      </Modal>
  )
}

export default CompanyDelete
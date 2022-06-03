import React from 'react'
import {Button,  Modal} from "react-bootstrap";
import { useDispatch } from 'react-redux';
import {  updateTicket, uploadDoneTaskFile} from '../_redux/api';
import { actions } from '../_redux/actions';
import { Formik  , Form} from 'formik';
import Input from '../../../components/form/Input';
import * as Yup from "yup";
import { FileInput } from '../../../components/form/FileInput';


function DeliverTicket({handleShow, show , delivertask}) {


    const dispatch = useDispatch();

    const initialValues = {
        file : '' ,
        note: '',
    
    };
    const schema = Yup.object().shape({

         file :Yup.string().required("Le Fichier est obligatoire"),
    });

    const SendFileTicket = async (values) => {
        const formData = new FormData();
        formData.append("file", values.file);
        formData.append("note", values.note);

        uploadDoneTaskFile(formData , delivertask.id  )
        .then( response => { 
            handleShow(false);
             dispatch(actions.requestTickets())
        })
        .catch( errors => { console.log(errors)} )
    
    }

  return (
    <Modal show={show} onHide={() => handleShow(false)}>
        <Modal.Header>
            <Modal.Title className="text-center"> 
                <h4 > Envoyer le fichier</h4>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Formik initialValues={initialValues}
                validationSchema={schema}
                onSubmit={(values, { setStatus, setSubmitting }) => {
                    SendFileTicket( values , setStatus, setSubmitting);
                }}
                onReset={(values, { resetForm }) => resetForm()}
            >
            {({ errors, isSubmitting, submitForm }) => (
                <Form>
                    <FileInput name="file" ></FileInput>
                    <Input label="Note" name="note" />
                    <div className='d-flex justify-content-end '>
                    <button
                        onClick={() => handleShow(false)}
                        className="btn btn-secondary"
                    >
                        Annuler
                    </button>
                    <button
                            type="submit"
                            className={`btn btn-info ml-2`}
                            onClick={submitForm}
                    >
                        Envoyer
                    </button>
                    </div>
                
                </Form>
            )}

            </Formik>   
            </Modal.Body>
      </Modal>
  )
}

export default DeliverTicket
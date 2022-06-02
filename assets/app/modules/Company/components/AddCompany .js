import { Form, Formik } from 'formik';
import React from 'react'
import Input from '../../../components/form/Input';
import * as Yup from "yup";
import { Submit } from '../../../components/form/Submit';
import { addCompany, getCompany } from "../../Company/_redux/api";
import { useNavigate } from 'react-router-dom';

function AddCompany () {

  const navigate = useNavigate();
  const initialValues = {
    name : '' ,
    description : ''

  };
  const schema = Yup.object().shape({
      
      name: Yup.string().required("Le nom est  obligatoire"),
      description: Yup.string().required("la description est obligatoire"),
  });

  const saveCompany = (values, setStatus, setSubmitting) => {
    addCompany(values)
    .then( (response) => { 
        // navigate(`/tickets/edit/${response.id}`)
        // navigate(-1)
    })
    .catch( (errors ) => console.log(errors))
  }

  return (
    <Formik initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { setStatus, setSubmitting }) => {
          saveCompany( values , setStatus, setSubmitting);
        }}
        onReset={(values, { resetForm }) => resetForm()}
    >
          {({ errors, isSubmitting, submitForm }) => (
              <Form>
                  <Input label="name" name="name" />
                  <Input label="description" name="description" />
                  <Submit
                      onClick={submitForm}
                      onReset={() => navigate(-1)}
                      disabled={isSubmitting || errors.length}
                  />
            </Form>
    )}

</Formik>
  )
}

export default AddCompany 
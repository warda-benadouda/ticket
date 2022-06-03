import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import Input from '../../../components/form/Input';
import * as Yup from "yup";
import { Submit } from '../../../components/form/Submit';
import { addCompany, getCompanies, getCompany } from "../../Company/_redux/api";
import { useNavigate } from 'react-router-dom';

function AddCompany () {

  const navigate = useNavigate();
  const [ companies , setCompanies ] = useState();
  
  const initialValues = {
    name : '' ,
    description : ''

  };
  const schema = Yup.object().shape({
      
      name: Yup.string().required("Le nom est  obligatoire"),
      description: Yup.string().required("la description est obligatoire"),
  });

  useEffect(() => {
    getCompanies()
    .then( (response) => { 
     setCompanies(response)
       })
    .catch( (errors ) => console.log(errors))
} , [])

  const saveCompany = (values, setStatus, setSubmitting) => {
    addCompany(values)
    .then( (response) => { 
        navigate(`/companies/edit/${response.id}`)
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
                  <Input label="Nom" name="name" />
                  <Input label="Description" name="description" />
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
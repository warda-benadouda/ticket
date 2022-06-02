import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import Input from '../../../components/form/Input';
import * as Yup from "yup";
import { Submit } from '../../../components/form/Submit';
import { addCompany, getCompanies, getCompany } from "../../Company/_redux/api";
import { useNavigate } from 'react-router-dom';
import { addDepartement } from '../_redux/api';
import { Select } from '../../../components/form/Select';

function DepartementAdd() {

  const navigate = useNavigate();
  const [ companies , setCompanies ] = useState();

  useEffect(() => {
    getCompanies()
    .then( (response) => { 
     setCompanies(response)
       })
    .catch( (errors ) => console.log(errors))
} , [])

  const initialValues = {
    name : '' ,
    company: ''

  };
  const schema = Yup.object().shape({
    name : Yup.string().required("Le nom est  obligatoire"),
    company: Yup.string().required("Entreprise est obligatoire"),
  });

  const saveDepartement = (values, setStatus, setSubmitting) => {
    addDepartement(values)
    .then( (response) => { 
        navigate(`/departements/edit/${response.id}`)
    })
    .catch( (errors ) => console.log(errors))
  }

  return (
    <Formik initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { setStatus, setSubmitting }) => {
          saveDepartement( values , setStatus, setSubmitting);
        }}
        onReset={(values, { resetForm }) => resetForm()}
    >
          {({ errors, isSubmitting, submitForm }) => (
              <Form>
                  <Input label="name" name="name" />
                  <Select name="company"
                        label="company"
                        placeholder={"Sélectionnez une entreprise..."}
                    >
                        {companies && companies.map((company, index) => (
                            <option key={index} value={company["@id"]}>{company.name}</option>
                        ))}
                    </Select>
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

export default DepartementAdd
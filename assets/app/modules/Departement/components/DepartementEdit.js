import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Form, Formik , Field } from "formik";
import * as Yup from "yup";
import { Card } from '../../../components/Card';
import Input from "../../../components/form/Input";
import { Submit } from "../../../components/form/Submit";
import { useNavigate, useParams } from "react-router-dom";
import { actions } from '../_redux/actions';
import { Loading } from '../../../components/Loading';
import { Select } from "../../../components/form/Select";
import { getCompanies, getCompany } from "../../Company/_redux/api";
import { getDepartement, updateDepartement } from "../_redux/api";

function DepartementEdit() {

   
    const [ departement , setDepartement ] = useState();
    const [ companies , setCompanies ] = useState();
    let {id} =  useParams();
    const navigate = useNavigate();

    useEffect (() => {

         getCompanies()
         .then( (response) => { 
          setCompanies(response)
            })
         .catch( (errors ) => console.log(errors))

         getDepartement(id)
         .then( (response) => { 
            setDepartement(response)
            })
         .catch( (errors ) => console.log(errors))
    } , [])
    
    const initialValues = {
        name : departement?.name ,
        company: departement?.company
    };
    const schema = Yup.object().shape({
        name : Yup.string().required("Le nom est  obligatoire"),
        company: Yup.string().required("Entreprise est obligatoire"),
    });

    

    const  toUpdatedepartement = (values, setStatus, setSubmitting) => {
      updateDepartement(id , values)
        .then( (response) => { 
            navigate(-1)
            })
         .catch( (errors ) => console.log(errors))
    }

  return (
    <div className="content">
        <Card title="Modifier le département ">
            { departement ?
            <Formik 
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={(values, { setStatus, setSubmitting }) => {
                  toUpdatedepartement( values , setStatus, setSubmitting);
                }}
                onReset={(values, { resetForm }) => resetForm()}
            >
            {({ errors, isSubmitting, submitForm  , values}) => (
                <Form>

                    <Input label="Nom" name="name" />

                    <Select name="company"
                        label="Entreprise"
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
            : <Loading/>
            }
        </Card>
    </div>
  )
}

export default DepartementEdit
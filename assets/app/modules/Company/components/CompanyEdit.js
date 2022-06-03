
import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Form, Formik , Field } from "formik";
import * as Yup from "yup";
import { Card } from '../../../components/Card';
import Input from "../../../components/form/Input";
import { Submit } from "../../../components/form/Submit";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { actions } from '../_redux/actions';
import { Loading } from '../../../components/Loading';
import { Select } from "../../../components/form/Select";
import { getCompany, updateCompany } from "../_redux/api";


function CompanyEdit() {

   
    const [ company , setCompany ] = useState();
    const navigate = useNavigate();
    let {id} =  useParams();

    useEffect (() => {
         getCompany(id)
         .then( (response) => { 
            setCompany(response)
            })
         .catch( (errors ) => console.log(errors))
    } , [])
    
    const initialValues = {
        name : company?.name ,
        description : company?.description 
    };
    const schema = Yup.object().shape({
        name : Yup.string().required("Le nom est  obligatoire"),
        description: Yup.string().required("la description est obligatoire"),
    });

    

    const  Setcompany= (values, setStatus, setSubmitting) => {
        updateCompany(id , values)
        .then( (response) => { 
            navigate(-1)
            })
         .catch( (errors ) => console.log(errors))
    }

  return (
    <div className="content">
        <Card title="Modifier l'entreprise ">
            { company ?
            <Formik initialValues={initialValues}
                validationSchema={schema}
                onSubmit={(values, { setStatus, setSubmitting }) => {
                    Setcompany( values , setStatus, setSubmitting);
                }}
                onReset={(values, { resetForm }) => resetForm()}
            >
            {({ errors, isSubmitting, submitForm  , values}) => (
                <Form>

                    <Input label="Nom" name="name" />
                    <Input label="Description" name="description" />

                    <Submit
                        onClick={submitForm}
                        onReset={() => Navigate(-1)}
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

export default CompanyEdit
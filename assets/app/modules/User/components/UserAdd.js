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
import { addUser} from "../_redux/api";
import { getCompanies, getCompany } from "../../Company/_redux/api";

function UserAdd() {

    const [ companies , setCompanies ] = useState();
    const [ departements , setDepartemets ] = useState();
    const [ selectedcompany , setSelecteCompany ] = useState();
    const navigate = useNavigate();


    useEffect (() => {
        getCompanies()
        .then( (response) => { 
        setCompanies(response)
          })
        .catch( (errors ) => console.log(errors))
    } , [])

    useEffect (() => {

      selectedcompany && 
       getCompany(selectedcompany)
      .then( (response) => { 
        setDepartemets(response.departements)
         })
      .catch( (errors ) => console.log(errors))

 } , [selectedcompany])
    
    const initialValues = {
      firstName : '',
      lastName : '', 
      roles : [],
      departement : '' ,
      email : '' ,
      company : '',
      password : ''

    };
    const schema = Yup.object().shape({
      // firstName: Yup.string().required("Prénom obligatoire"),
      // lastName: Yup.string().required("Nom obligatoire"),
      email: Yup.string().email().required("Email obligatoire"),
      company: Yup.string().required("Entreprise obligatoire"),
      departement: Yup.string().required("Département obligatoire"),
      // roles: Yup.string().required("Role obligatoire"),
      password : Yup.string().required("Mot de passe obligatoire")
    });

    

    const  ToAddUser = (values, setStatus, setSubmitting) => {

        addUser( values) 
        .then( (response) => { 
          navigate(`/users/edit/${response.id}`)
            })
         .catch( (errors ) => console.log(errors))
    }

  return (
            <Formik initialValues={initialValues}
                validationSchema={schema}
                onSubmit={(values, { setStatus, setSubmitting }) => {
                  ToAddUser( values , setStatus, setSubmitting);
                }}
                onReset={(values, { resetForm }) => resetForm()}
            >
            {({ errors, isSubmitting, submitForm  , values}) => (
                <Form>

                    <Input label="Nom" name="firstName" />
                    <Input label="Prénom" name="lastName" />
                    <Input label="email" name="email" />
                    <Input label="Mot de passe" name="password" />
                    <Select name="company"
                        label="Entreprise"
                        placeholder={"Sélectionnez une Entreprise..."}
                        onClick={ (e) => setSelecteCompany(e.target.value) }
                    >
                        { companies && companies.map(( company , index) => (
                            <option key={index} value={company["id"]}> {company.name} </option>
                        ))}
                    </Select>

                    <Select name="departement"
                        label="departement"
                        placeholder={"Sélectionnez un departement..."}
                    >
                        { departements && departements.map(( dept, index) => (
                            <option key={index} value={dept["@id"]}> {dept.name} </option>
                        ))}
                    </Select>
                  {/* <Select
                            placeholder="Selectionnez un rôle..."
                            name="roles"
                            label="Rôle"
                        >
                            <option key='ROLE_USER' value='ROLE_USER'  >Utilisateur simple</option>
                            <option key='ROLE_ADMIN' value='ROLE_ADMIN'  >Administrateur</option>
                            <option key='ROLE_SUPER_ADMIN' value='ROLE_SUPER_ADMIN'>Super Administrateur</option> 
                  </Select> */}
  
 

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

export default UserAdd
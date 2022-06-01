import React, { useEffect, useState } from 'react'
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/form/Input';
import { Submit } from '../../../components/form/Submit';
import { getDepartement } from "../../Departement/pages/_redux/api";
import { addTicket} from '../_redux/api';
import { useSelector } from 'react-redux';
import { Select } from '../../../components/form/Select';
import { getCompany } from "../../Company/_redux/api";

function AddTicket() {

  const navigate = useNavigate();
  const [  departements , setdepartements ] = useState();
  const { user }= useSelector(state => state.auth.user);
  const [  selectedDep , setSelectedDep] = useState();
  const [users, setUsers] = useState()

  useEffect (() => {

    user && getCompany(user.companyId)
    .then( (response) => { 
       setdepartements(response.departements)
       })
    .catch( (errors ) => console.log(errors))

    } , [])

    useEffect(() => {

        selectedDep && 
        getDepartement(selectedDep)
        .then( (response) => { 
            setUsers(response.users)
           })
        .catch( (errors ) => console.log(errors))
       
   } , [selectedDep])

  const initialValues = {
      label : '' ,
      taskDescription : '',
      deadline : '' , 
      user : '' , 
      createdBy : `/api/users/${user.id}`,
      state : '0',

  };
  const schema = Yup.object().shape({
       
      label: Yup.string().required("Le nom est  obligatoire"),
      taskDescription: Yup.string().required("la description est obligatoire"),
      deadline: Yup.date().min(new Date(Date.now() - 86400000), "la date doit etre minimum aujourd'hui").required("Date  de début obligatoire"),
      user: Yup.string().required("Utilisateur obligatoire"),
  });

  const saveTicket = (values, setStatus, setSubmitting) => {
    addTicket(values)
    .then( (response) => { 
        navigate(`/tickets/edit/${response.id}`)
    })
    .catch( (errors ) => console.log(errors))
  }
  return (
    <>
        <Formik initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values, { setStatus, setSubmitting }) => {
                saveTicket( values , setStatus, setSubmitting);
            }}
            onReset={(values, { resetForm }) => resetForm()}
        >
        {({ errors, isSubmitting, submitForm }) => (
            <Form>
                <Input label="Nom" name="label" />
                <Input label="Description" name="taskDescription" />
                <Input  type="date" label="Date limite" name="deadline" />
                <Select name="departement"
                        label="departement"
                        placeholder={"Sélectionnez un departement..."}
                        onClick={ (e) => setSelectedDep(e.target.value) }
                    >
                        { departements && departements.map(( dept, index) => (
                            <option key={index} value={dept["id"]}> {dept.name} </option>
                        ))}
                    </Select>
                    { selectedDep &&  
                    <Select name="user"
                        label="User"
                        placeholder={"Sélectionnez un utilisateur..."}
                    >
                        {users && users.map((user, index) => (
                            <option key={index} value={user["@id"]}>{user.firstName} {user.lastName} ({user.email})</option>
                        ))}
                    </Select>
                    }
                <Submit
                    onClick={submitForm}
                    // onReset={() => navigate(-1)}
                    disabled={isSubmitting || errors.length}
                />
            </Form>
        )}

        </Formik>

    </>
  )
}

export default AddTicket
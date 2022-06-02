import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Form, Formik , Field } from "formik";
import * as Yup from "yup";
import { Card } from '../../../components/Card';
import Input from "../../../components/form/Input";
import { Submit } from "../../../components/form/Submit";
import { useNavigate, useParams } from "react-router-dom";
import { actions } from '../_redux/actions';
import { getTicket , updateTicket} from '../_redux/api';
import { Loading } from '../../../components/Loading';
import { Select } from "../../../components/form/Select";
import { getCompany } from "../../Company/_redux/api";
import { getDepartement } from "../../Departement/_redux/api";



function TicketEdit() {

    const navigate = useNavigate();
    const [ ticket , setTicket ] = useState();
    const [  departements , setdepartements ] = useState();
    const [  selectedDep , setSelectedDep] = useState();
    const [  requiredDep , setRequiredDep] = useState();
    const [users, setUsers] = useState(null)
    let {id} =  useParams();
    const { user }= useSelector(state => state.auth.user);

    useEffect (() => {
         getTicket(id)
         .then( (response) => { 
             setTicket(response)
            })
         .catch( (errors ) => console.log(errors))

         user && getCompany(user.companyId)
         .then( (response) => { 
            setdepartements(response.departements)
            })
         .catch( (errors ) => console.log(errors))
    } , [])
    

    useEffect (() => {

        selectedDep && 
        getDepartement(selectedDep)
        .then( (response) => { 
            setUsers(response.users)
           })
        .catch( (errors ) => console.log(errors))
       
   } , [selectedDep])



    const initialValues = {
        label : ticket?.label ,
        taskDescription : ticket?.taskDescription ,
        deadline : (ticket?.taskDescription)?.split('T')[0], 
        user : ticket?.user?.name , 
        state :  ticket?.state,
        isUpdated : false
    };
    const schema = Yup.object().shape({
         
        label: Yup.string().required("Le nom est  obligatoire"),
        taskDescription: Yup.string().required("la description est obligatoire"),
        deadline: Yup.date().min(new Date(Date.now() - 86400000), "la date doit etre minimum aujourd'hui").required("Date  de début obligatoire"),
        user:  selectedDep && Yup.string().required("l'utilisateur  est obligatoire"),
        departement : requiredDep &&  Yup.string().required(" Departement est  obligatoire"),
    });

    

    const  SetTicket = (values, setStatus, setSubmitting) => {

        console.log(values , "update values")
        updateTicket(id , values)
        .then( (response) => { 
            navigate(-1)
            })
         .catch( (errors ) => console.log(errors))
    }

  return (
    <div className="content">
        <Card title="Modifier le ticket ">
            {  ( ticket  && departements )?
            <Formik initialValues={initialValues}
                validationSchema={schema}
                onSubmit={(values, { setStatus, setSubmitting }) => {
                    SetTicket( values , setStatus, setSubmitting);
                }}
                onReset={(values, { resetForm }) => resetForm()}
            >
            {({ errors, isSubmitting, submitForm  , values}) => (
                <Form>
                    <Input label="Nom" name="label" />
                    <Input label="Description" name="taskDescription" />
                    <Input  type="date" label="Date limite" name="deadline" />

                    <Field type="checkbox" name="isUpdated"  onClick={ (e) => setRequiredDep(e.target.value) }/>
                    <label className="ml-2">Modifier l'utilisateur</label>

                    { values.isUpdated && 

                        <Select name="departement"
                        label="departement"
                        placeholder={"Sélectionnez un departement..."}
                        onClick={ (e) => setSelectedDep(e.target.value) }
                        >
                        { departements && departements.map(( dept, index) => (
                            <option key={index} value={dept["id"]}> {dept.name} </option>
                        ))}
                        </Select>
                    }

                    
                    {( selectedDep && values.isUpdated) &&
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

export default TicketEdit
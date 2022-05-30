import { Formik, Form } from 'formik';
import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {NavLink, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import Input from '../../../components/form/Input'
import { Submit } from '../../../components/form/Submit';
import {actions} from "../_redux/actions";
import { login } from "../_redux/api";

function Login() {

  const user = useSelector((state) => state.auth.user, shallowEqual);
  const  dispatch = useDispatch();
  const navigate = useNavigate();

  const saveLogin = (values, setStatus, setSubmitting) => {

     login(values.email, values.password)
     .then(({ data }) => {
        dispatch(actions.loadUser(data));
        navigate('/tickets');
    })
     .catch ( errors => {
       console.log( errors , "errors");
     })
  };

  const initialValues = {
     email : '',
     password : ''
  };

  const Schema = Yup.object().shape({
      email: Yup.string()
        .email("Wrong email format")
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required( "L'adresse email est obligatoire"),
      password: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required( "Le mot de passe est obligatoire "),
    });

  return (

    <Formik
      initialValues={initialValues}
      validationSchema={Schema}
      onSubmit={(values, { setStatus, setSubmitting }) => {
        saveLogin(values, setStatus, setSubmitting);
      }}

    >
      {({ errors, isSubmitting, submitForm }) => (
        <Form>
          <div className='container-fluid' style={{ backgroundColor : "#F8FAFB"}}>
            <div className="row">
              <div className="col-6">
                <img src="/media/background-login.png" />
              </div>
              <div className="col-lg-6 col-md-12 col-xs-12 my-auto" >
                <div className="justify-content-center d-flex  ">
                  <div className="col-lg-8  col-md-12">
                    <div className="mb-4 ">
                      <h3>Connexion</h3>
                      <p className="mb-4">Veuillez saisir votre email et mot de passe</p>
                    </div>

                    <div className="form-group first">
                      <Input label="email" name="email" />
                    </div>
                    <div className="form-group last mb-4">
                      <Input label="password" name="password" />
                    </div>
                      <input type="submit" value="Se connecter" className="btn btn-block btn-primary" onClick={submitForm}/>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </Form>
      )}

    </Formik>

  )
}

export default Login
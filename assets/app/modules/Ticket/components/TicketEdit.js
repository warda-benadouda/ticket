import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Card } from '../../../components/Card';
import Input from "../../../components/form/Input";
import { Submit } from "../../../components/form/Submit";
import { useNavigate } from "react-router-dom";

function TicketEdit() {

    const navigate = useNavigate();

    const initialValues = {
        label : '' ,
        taskDescription : '',
        deadline : '' , 
        user : '' , 
        state : 0,


    };
    const schema = Yup.object().shape({
         
        label: Yup.string().required("Le nom est  obligatoire"),
        taskDescription: Yup.string().required("la description est obligatoire"),
        deadline: Yup.string().required("Entreprise obligatoire"),
        deadline: Yup.date().min(new Date(Date.now() - 86400000), "la date doit etre minimum aujourd'hui").required("Date  de début obligatoire"),
        user: Yup.string().required("la description est obligatoire"),
    });

    const saveTicket = (values, setStatus, setSubmitting) => {

    }

  return (
      <div className="content">
    <Card title="Modifier le ticket ">
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
                <Input label="User" name="user" />
                <Submit
                    onClick={submitForm}
                    onReset={() => navigate(-1)}
                    disabled={isSubmitting || errors.length}
                />
            </Form>
        )}

        </Formik>
    </Card>
    </div>
  )
}

export default TicketEdit
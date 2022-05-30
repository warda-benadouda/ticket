import React from "react";
import { useField } from 'formik';
import {getInputClasses} from "./helpers";

function Input({label, alignment = "vertical", ...props}) {

    const [field, meta, helpers] = useField(props.name);
    let isHorizontal = alignment === "horizontal";
    
  return (
    <div className="form-group row">
    <label className={`${isHorizontal ? 'col-md-12' : 'col-md-3'} col-xs-12`} >{ label ?? props.name}</label>
    <div className={`${isHorizontal ? 'col-md-12' : 'col-md-9'} col-xs-12`}>
        <input
            {...field}
            {...props}
            className={`form-control form-control form-control-solid ${getInputClasses(meta)}`}
            placeholder={props.placeholder ?? label}
        />
        {meta.touched && meta.error ? (
            <div className="invalid-feedback">
                {meta.error}
            </div>
        ) : null}
    </div>
  </div>
  )
}

export default Input
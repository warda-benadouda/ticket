import React from "react";
import { useField } from 'formik';
import {getInputClasses} from "./helpers";

export function Select({label, alignment = "vertical" ,defaultValue="", ...props }) {
    const [field, meta, helpers] = useField(props.name);

    let isHorizontal = alignment === "horizontal";

    return (
        <div className="form-group row">
            <label className={`${isHorizontal ? 'col-md-12' : 'col-md-3'} col-xs-12 `} >{ label ?? props.name}</label>
            <div className={`${isHorizontal ? 'col-md-12' : 'col-md-9'} col-xs-12`}>
                <select
    
                    defaultValue={defaultValue}
                    {...field}
                    {...props}
                     className={` form-control form-control-lg form-control-solid ${getInputClasses(meta)}`}
                    //  className={`form-control form-control-lg  ${getInputClasses(meta)}`}
                    
                >
                    { props.placeholder && <option disabled value="">{ props.placeholder }</option> }
                    { props.children }
                </select>
                {meta.touched && meta.error ? (
                    <div className="invalid-feedback">
                        {meta.error}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

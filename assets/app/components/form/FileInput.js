import React, {useEffect} from "react";
import { useField } from 'formik';
import {getInputClasses} from "./helpers";

export function FileInput({label, alignment = "vertical", ...props}) {

    const [field, meta, helpers] = useField(props.name);
    const [fieldFile, metaFile, helpersFile] = useField(`${props.name}File`);

    useEffect(() => {
        helpersFile.setError(metaFile.error)
    }, [meta.error])

    let isHorizontal = alignment === "horizontal";

    return (
        <div className="form-group row">
            <label className={`${isHorizontal ? 'col-md-12' : 'col-md-3'} col-xs-12`} >{ label ?? props.name}</label>
            <div className={`${isHorizontal ? 'col-md-12' : 'col-md-9'} col-xs-12`}>
                <input
                    {...fieldFile}
                    {...props}
                    className={`form-control form-control-lg form-control-solid ${getInputClasses(meta)}`}
                    placeholder={props.placeholder ?? label}
                    type="file"
                    name={fieldFile.name}
                    onChange={(e) => {
                        helpers.setValue(e.currentTarget.files[0])
                        helpers.setTouched(true)
                        helpersFile.setTouched(true)
                    }}
                />
                {meta.touched && meta.error ? (
                    <div className="invalid-feedback">
                        {meta.error}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

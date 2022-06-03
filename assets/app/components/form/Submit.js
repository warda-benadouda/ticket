import React from "react";
import { Button as BootstrapButton } from "react-bootstrap";

export function Submit({label ="Enregistrer", size="lg", onReset, onResetLabel = "Annuler", ...props}) {

    return (
        <div className="form-group row">
            <label className="col-xs-12 col-md-3 col-form-label"/>
            <div className="col-xs-12 col-md-9 text-right">
                {
                    onReset &&
                    <BootstrapButton
                        onClick={onReset}
                        variant={"info"}
                        className={"mr-2"}
                        size={size}
                    >
                        {onResetLabel}
                    </BootstrapButton>
                }
                <BootstrapButton
                    type="submit"
                    size={size}
                    {...props}
                >
                    {label}
                </BootstrapButton>
            </div>
        </div>

    );
}
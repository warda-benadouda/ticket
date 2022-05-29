import React from "react";

export function ToolBar({ children }) {

    return (

        <ul className="nav nav-pills red nav-pills-sm ">
            {children}
        </ul>
    );
}


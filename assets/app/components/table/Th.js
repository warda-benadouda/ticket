import React from "react";

export const Th = ({minwidth = 40, className = "", children, displayFrom=null}) => {
    return (
        <th className={`${className} ${ displayFrom && `d-none d-${displayFrom}-table-cell`}`} style={{minwidth}} >
            {children}
        </th>
    );
}
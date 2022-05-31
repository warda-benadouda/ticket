import React from "react";

export const Th = ({minWidth = 40, className = "", children, displayFrom=null}) => {
    return (
        <th className={`${className} ${ displayFrom && `d-none d-${displayFrom}-table-cell`}`} style={{minWidth}} >
            {children}
        </th>
    );
}
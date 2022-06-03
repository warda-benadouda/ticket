import React from "react";

export const Td = ({className = "", children, displayFrom = null, ...props }) => {
    return (
        <td
            className={`${className} ${displayFrom && `d-none d-${displayFrom}-table-cell`}`}
            {...props}
        > 
            {children}
        </td>
    );
}
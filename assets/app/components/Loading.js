import React from "react";
export  function Loading ({size = "md"})
{
    return (
        <div className={`spinner-border text-primary center spinner-border-${size}`} role="status"/>
    );
}
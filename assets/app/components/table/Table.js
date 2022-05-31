import React from "react";

export const Table = ({className = "", responsive = true, children}) => {
    return (
            <div className={responsive ? `${className}` : `${className} table-responsive`}>
                <table className="table table-head-custom table-vertical-center ">
                    {children}
                </table>
            </div>
    );
}
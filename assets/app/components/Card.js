import React from "react";

export function Card({height="180px" , children, title, label, secondLabel, toolbar, className = "", subtitle, footer, ...props }) {

    return (
        <div className={`col-xs-12 pt-5 pb-0 b-0 `} style={props.style}>
            <div className={`card card-custom ${className}`}   style={{ minHeight: height}}>
                {/* begin::Header */}
                {(title || toolbar || label) &&
                    <>
                        <div className="card-header border-0 pt-5 bg-white">
                            {
                                <>
                                    {label && <h5 className="card-label text-primary">{label}</h5>}
                                    {title &&
                                        <>
                                            <h3 className="card-title align-items-center ">
                                                <span className="card-label font-weight-bolder text-primary">{title}</span>
                                            </h3>
                                            {subtitle && <h5 className="card-label text-muted"> {subtitle}</h5>}
                                        </>
                                    }
                                </>
                            }
                            {toolbar && (<div className="card-toolbar "> {toolbar} </div>)}
                        </div>
                        {secondLabel && <h3 className="card-label align-items-start pl-5 ml-5">  {secondLabel}</h3>}

                    </>
                }
                {/* end::Header */}

                {/* begin::Body */}

                <div className="card-body">
                    {children}
                </div>

                {footer &&
                    <div className="card-footer">
                        {footer}
                    </div>
                }




                {/* end::Body */}
            </div>
            {/* end::Base Table Widget 6 */}
        </div>
    );
}

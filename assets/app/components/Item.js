import React from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import SVG from "react-inlinesvg";


export function Item({ title, name, tooltip, activeTab, onClick , icon }) {

    return (
            <li className="nav-item mr-2 " >
                <OverlayTrigger
               
                    overlay={
                        <Tooltip >{tooltip}</Tooltip>
                    }
                  
                >
                    <a
                        className={`nav-link py-2 px-4 ${activeTab === name &&
                        "active"}`}
                        data-toggle="tab"
                        href={name && `#${name}`}
                        onClick={onClick}
                        
                    >
                        {icon &&
                                 <span className="navi-icon mr-2">
                                      
                                        <SVG
                                           src={icon}
                                        />
                        </span>
                           
                          }     
                        

                        {title ?? name}
                    </a>
                </OverlayTrigger>
            </li>
    );
}



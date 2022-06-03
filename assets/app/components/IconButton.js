import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";

export const IconButton = ({ filter , marginBtn = "m-1", disabled = '', onClick, size = "md", light = true, tooltip = null, iconPath = "/media/svg/Edit.svg", variant = "primary", className = "", ...props }) => {

    const button = <button
        {...props}
        className={`${marginBtn} btn btn-icon btn-${size} btn-hover-light-${variant} btn-sm ${className} ${disabled} `}
        onClick={(e) => onClick(e)}

    >
        <img src={iconPath} className={filter}/>

    </button>;

    if (tooltip) {
        return (
            <OverlayTrigger overlay={<Tooltip>{tooltip}</Tooltip>}>
                {button}
            </OverlayTrigger>
        )
    }

    return (button)
}

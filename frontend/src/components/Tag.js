import './Tag.css'
import {NavLink} from "react-router-dom";
import React from "react";

function Tag (props) {
    let tagName = props.tagName;
    let highlighted = props.highlighted;

    return (
        <li className={`tag-item ${highlighted && 'tag-highlighted'}`}>
            <NavLink className={`tag-text ${highlighted && 'tag-text-highlighted'}`}
                     to={`/search?t=${tagName}`}><span>{props.tagName}</span></NavLink>
        </li>
    )
}

export default Tag

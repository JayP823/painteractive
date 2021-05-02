import './Tag.css'
import {NavLink} from "react-router-dom";
import React from "react";

function Tag (props) {
    let tagName = props.tagName;
    let highlighted = props.highlighted;
    let hasLink = props.hasLink;

    return (
        <li className={`tag-item ${highlighted && 'tag-highlighted'}`}>
            {hasLink ? <NavLink className={`tag-text ${highlighted && 'tag-text-highlighted'}`}
                      to={`/search?t=${tagName}`}><span>{props.tagName}</span></NavLink>
            : <div className={`tag-text ${highlighted && 'tag-text-highlighted'}`}>
                    <span>{props.tagName}</span>
            </div>
            }
        </li>
    )
}

export default Tag

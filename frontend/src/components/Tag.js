import './Tag.css'
import {NavLink} from "react-router-dom";
import React from "react";
import {AiOutlineClose} from "react-icons/ai";

function Tag (props) {
    let tagName = props.tagName;
    let highlighted = props.highlighted;
    let deleteTag = props.deletable;
    let hasLink = props.hasLink;
    let setQuery = props.setQuery;

    let handleQueryUpdate = () => {
        if (setQuery) setQuery(tagName);
    }

    return (
        <li className={`tag-item ${highlighted && 'tag-highlighted'}`}>
            {!deleteTag ? <NavLink className={`tag-text ${highlighted && 'tag-text-highlighted'}`}
                      to={`/search?q=${tagName}`} onClick={handleQueryUpdate}><span>{props.tagName}</span></NavLink>
            : <div onClick={() => {deleteTag(tagName)}} className={`tag-text ${highlighted && 'tag-text-highlighted'}`}>
                    <span>{props.tagName}{deleteTag && <AiOutlineClose/>}</span>
            </div>
            }
        </li>
    )
}

export default Tag

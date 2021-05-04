import './Feed.css'
import Post from "./Post";
import {useState} from "react";
const dotenv = require('dotenv').config();

function Feed (props) {
    const [postData, setPostData] = useState([]);
    let user = props.user;

    let updatePosts = (newPosts, replace) => {
        console.log(newPosts);
        console.log(replace);
        if (replace) {
            setPostData(newPosts);
        } else {
            setPostData(postData.concat(newPosts));
        }
    }

    props.feedDataRef(updatePosts);

    return (
        <div className='feed-wrapper'>
            {postData.map((post, index) => {
                if (post !== null) return <Post user={user} setQuery={props.setQuery} key={"banner" + index} post={post} index={index + 1}/>
            })}
        </div>
    )
}

export default Feed

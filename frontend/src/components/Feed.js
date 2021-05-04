import './Feed.css'
import Post from "./Post";
import {useState} from "react";
const dotenv = require('dotenv').config();

function Feed (props) {
    const [postData, setPostData] = useState([]);
    let user = props.user;
    let setUser = props.setUser;

    let updatePosts = (newPosts, replace) => {
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
                if (post !== null) return <Post user={user} setUser={setUser} setQuery={props.setQuery} key={"banner" + index} post={post} index={index + 1}/>
            })}
        </div>
    )
}

export default Feed

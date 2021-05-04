import './Feed.css'
import Post from "./Post";
import {useState} from "react";
const dotenv = require('dotenv').config();

function Feed (props) {
    const [postData, setPostData] = useState([]);
    let user = props.user;
    let setUser = props.setUser;
    let query = props.query;

    let updatePosts = (newPosts, replace) => {
        if (replace) {
            if (newPosts && Object.keys(newPosts).length === 0 && newPosts.constructor === Object){
                setPostData([]);
            } else {
                setPostData(newPosts);
            }
        } else {
            setPostData(postData.concat(newPosts));
        }
    }

    props.feedDataRef(updatePosts);
    
    return (
        <div className='feed-wrapper'>
            {postData.map((post, index) => {
                if (post !== null) return <Post user={user} setUser={setUser} query={query} setQuery={props.setQuery} comments={0} key={"banner" + index} post={post} index={index + 1}/>
            })}
        </div>
    )
}

export default Feed

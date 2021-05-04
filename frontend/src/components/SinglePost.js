import './SinglePost.css'
import {useEffect, useState} from "react";
import axios from "axios";
import Post from "./Post";
import {useParams} from "react-router-dom";

function SinglePost (props) {
    let user = props.user;
    let setUser = props.setUser;
    let postID = useParams().postid;
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        axios.get(`/post/${postID}`).then(response => {
            setPostData(response.data);
            return response.data;
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <section className={'single-post-container'}>
            {postData && <Post user={user} setUser={setUser} comments={2} post={postData}/>}
        </section>
    )
}

export default SinglePost

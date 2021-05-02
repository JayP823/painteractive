import './Feed.css'
import Post from "./Post";
import {useEffect, useState} from "react";
import axios from "axios";
const dotenv = require('dotenv').config();
const PAGE_LOAD_SIZE = 12;

function Feed () {
    const [postData, setPostData] = useState([]);

    let updatePosts = (newPosts) => {
        setPostData(postData.concat(newPosts));
    }

    useEffect(() => {
        let feedParams = {
            limit: PAGE_LOAD_SIZE,
            date: null
        }

        if (postData.length > 0) feedParams.date = postData[postData.length - 1].createdDate;

        axios.get(`http://${process.env.REACT_APP_HOST}:2121/post/feed`, {params: feedParams}).then(response => {
            updatePosts(response.data.reverse());
            return response.data.reverse();
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <div className='feed-wrapper'>
            {postData.map((post, index) => {
                if (post !== null) return <Post key={"banner" + index} post={post} index={index + 1}/>
            })}
        </div>
    )
}

export default Feed

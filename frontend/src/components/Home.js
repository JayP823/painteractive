import './Home.css'
import Post from "./Post";
import {useEffect, useState} from "react";
import axios from "axios";
const dotenv = require('dotenv').config();
let posts = [];
const PAGE_LOAD_SIZE = 12;

function Home () {
    const [postData, setPostData] = useState([]);

    let updatePosts = (newPosts) => {
        setPostData(postData.push(newPosts));
    }

    useEffect(() => {
        let feedParams = {
            limit: PAGE_LOAD_SIZE,
            date: null
        }

        if (postData.length > 0) feedParams.date = postData[postData.length - 1].createdDate;

        axios.get(`http://${process.env.HOST}:2121/post/feed`, {params: feedParams}).then(response => {
            console.log(response.data);
            updatePosts(response.data);
            return response.data;
        }).catch(error => {
            console.log(error);
        });
    })

    return (
        <div className='home-wrapper'>
            <Post/>
        </div>
    )
}

function loadPosts() {
    // TODO - Load a batch of posts and update the DOM with the new posts
}

export default Home

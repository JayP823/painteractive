import './Home.css'
import Post from "./Post";
import {useEffect, useState} from "react";
import axios from "axios";

let posts = [];
const PAGE_LOAD_SIZE = 12;

function Home () {
    const [postData, setPostData] = useState([]);

    let updatePosts = (newPosts) => {
        setPostData(postData.push(newPosts));
    }

    useEffect(() => {
        axios.get(`http://localhost:2121/post/recommend/uid/${uid}/size/${recSize}`).then(response => {
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

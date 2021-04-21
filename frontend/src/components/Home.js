import './Home.css'
import Post from "./Post";

let posts = [];

function Home () {
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

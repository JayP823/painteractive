import './Profile.css'
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineForm, AiOutlineUnorderedList} from 'react-icons/ai'
import {FaThumbsUp} from "react-icons/fa";
import {MdLocalMovies} from "react-icons/md";

function Profile (props) {
    let currentUser = props.user;
    let username = useParams().username;
    let [profileUser, setProfileUser] = useState(null);
    // Allowed feeds: posts, likes, media, gallery
    let [currentFeed, setCurrentFeed] = useState('posts');
    let [loadingPosts, setLoadingPosts] = useState(false);
    let [following, setFollowing] = useState(false);
    let [loadingFollowing, setLoadingFollowing] = useState(true);

    const changeFeed = (newFeed) => {
        setCurrentFeed(newFeed);
    }

    const followUser = () => {
        setLoadingFollowing(true);
        // TODO - Make an ajax call to follow the user
        setLoadingFollowing(false);
    }

    const unfollowUser = () => {
        setLoadingFollowing(true);
        // TODO - Make an ajax call to unfollow the user
        setLoadingFollowing(false);
    }

    const messageUser = () => {
        // TODO - Send a message to the user
    }

    useEffect(() => {

    }, [])

    useEffect(() => {
        setLoadingPosts(true);
        switch (currentFeed) {
            case 'posts':
                // Make ajax call to get all posts from user
                break;
            case 'likes':

                break;
            case 'media':

                break;
            case 'gallery':

                break;
        }
        setLoadingPosts(false);
    }, [currentFeed])

    return (
        <div className={'flex-container'}>
            <section className={'profile-header'}>
                <section className={'profile-background'}>

                </section>
                <section className={'header-bars'}>
                    <section className={'header-bar-1'}>
                        <div className={'user-data'}>
                            <h3>User Name</h3>
                        </div>
                        <div className={'bio-container'}>
                            <span className={'bio-text'}>BIO BIO BIO BIO BIO BIO BIO BIO</span>
                            <div className={'bio-edit'}>

                            </div>
                        </div>
                        <div className={'interact-buttons-container'}>
                            <button className={'interact-button message-button'} onClick={messageUser}>
                                <AiOutlineForm size={'60%'}/>
                                <h2>message</h2>
                            </button>
                            {!following ? <button disabled={loadingFollowing} onClick={followUser} className={'interact-button'}>
                                <AiOutlinePlusCircle size={'60%'}/>
                                <h2>follow</h2  >
                            </button>
                            : <button disabled={loadingFollowing} onClick={unfollowUser} className={'interact-button'}>
                                    <AiOutlineMinusCircle size={'60%'}/>
                                    <h2>unfollow</h2>
                                </button>
                            }
                        </div>
                    </section>
                    <section className={'header-bar-2'}>
                        <div className={'follow-counts'}>
                            <span>Following: n</span>
                            <span>Followers: n</span>
                        </div>
                        <ul className={'profile-options'}>
                            <li>
                                <button className={'profile-button'} disabled={currentFeed === 'posts'} onClick={() => {changeFeed('posts')}}>
                                    <AiOutlineForm size={'70%'}/>
                                    <h2>posts</h2>
                                </button>
                            </li>
                            <li>
                                <button className={'profile-button'} disabled={currentFeed === 'likes'} onClick={() => {changeFeed('likes')}}>
                                    <FaThumbsUp size={'70%'}/>
                                    <h2>likes</h2>
                                </button>
                            </li>
                            <li>
                                <button className={'profile-button'} disabled={currentFeed === 'media'} onClick={() => {changeFeed('media')}}>
                                    <MdLocalMovies size={'70%'}/>
                                    <h2>media</h2>
                                </button>
                            </li>
                            <li>
                                <button className={'profile-button'} disabled={currentFeed === 'gallery'} onClick={() => {changeFeed('gallery')}}>
                                    <AiOutlineUnorderedList size={'70%'}/>
                                    <h2>gallery</h2>
                                </button>
                            </li>
                            <li>

                            </li>
                        </ul>
                    </section>
                </section>
            </section>
            <section className={'profile-feed'}>
                {!loadingPosts &&
                <div className={'feed'}>

                </div>}
            </section>
        </div>
    )
}

export default Profile

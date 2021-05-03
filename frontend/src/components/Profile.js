import './Profile.css'
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineForm, AiOutlineUnorderedList} from 'react-icons/ai'
import {FaThumbsUp} from "react-icons/fa";
import {MdLocalMovies} from "react-icons/md";
import axios from "axios";

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
        axios.post(`/user/follow`, {username: username}).then(res => {
            setFollowing(true);
            setLoadingFollowing(false);
        }).catch(e => {
            console.log(e);
            setLoadingFollowing(false);
        })
    }

    const unfollowUser = () => {
        setLoadingFollowing(true);
        axios.post(`/user/follow`, {username: username}).then(res => {
            setFollowing(false);
            setLoadingFollowing(false);
        }).catch(e => {
            console.log(e);
            setLoadingFollowing(false);
        })
    }

    const messageUser = () => {
        // TODO - Send a message to the user
    }

    useEffect(() => {
        axios.get(`/user/profile?username=${username}`).then(res => {
            let userData = res.data[0];
            console.log(userData);
            console.log(currentUser);
            if (currentUser && userData.followers.includes(currentUser._id)) {
                setFollowing(true);
            };
            setLoadingFollowing(false);
            setProfileUser(res.data[0])
        })
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

    console.log(loadingFollowing);

    return (
        <div className={'outer-container'}>
            {profileUser && <div className={'flex-container'}>
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
                            {currentUser && <div className={'interact-buttons-container'}>
                                <button className={'interact-button message-button'} onClick={messageUser}>
                                    <AiOutlineForm size={'60%'}/>
                                    <h2>message</h2>
                                </button>
                                {!following ?
                                    <button disabled={loadingFollowing} onClick={followUser}
                                            className={'interact-button'}>
                                        <AiOutlinePlusCircle size={'60%'}/>
                                        <h2>follow</h2>
                                    </button>
                                    : <button disabled={loadingFollowing} onClick={unfollowUser}
                                              className={'interact-button'}>
                                        <AiOutlineMinusCircle size={'60%'}/>
                                        <h2>unfollow</h2>
                                    </button>
                                }
                            </div>}
                        </section>
                        <section className={'header-bar-2'}>
                            <div className={'follow-counts'}>
                                <span>Following: n</span>
                                <span>Followers: n</span>
                            </div>
                            <ul className={'profile-options'}>
                                <li>
                                    <button className={'profile-button'} disabled={currentFeed === 'posts'}
                                            onClick={() => {
                                                changeFeed('posts')
                                            }}>
                                        <AiOutlineForm size={'70%'}/>
                                        <h2>posts</h2>
                                    </button>
                                </li>
                                <li>
                                    <button className={'profile-button'} disabled={currentFeed === 'likes'}
                                            onClick={() => {
                                                changeFeed('likes')
                                            }}>
                                        <FaThumbsUp size={'70%'}/>
                                        <h2>likes</h2>
                                    </button>
                                </li>
                                <li>
                                    <button className={'profile-button'} disabled={currentFeed === 'media'}
                                            onClick={() => {
                                                changeFeed('media')
                                            }}>
                                        <MdLocalMovies size={'70%'}/>
                                        <h2>media</h2>
                                    </button>
                                </li>
                                <li>
                                    <button className={'profile-button'} disabled={currentFeed === 'gallery'}
                                            onClick={() => {
                                                changeFeed('gallery')
                                            }}>
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
            </div>}
        </div>
    )
}

export default Profile

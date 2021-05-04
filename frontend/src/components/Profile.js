import './Profile.css'
import {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import {AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineForm, AiOutlineUnorderedList} from 'react-icons/ai'
import {FaThumbsUp} from "react-icons/fa";
import {MdLocalMovies} from "react-icons/md";
import axios from "axios";
import {BsGearFill} from "react-icons/bs";
import Feed from "./Feed";

function Profile (props) {
    let currentUser = props.user;
    let username = useParams().username;
    const [profileUser, setProfileUser] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    // Allowed feeds: posts, likes, media, gallery
    const [currentFeed, setCurrentFeed] = useState('posts');
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [following, setFollowing] = useState(false);
    const [loadingFollowing, setLoadingFollowing] = useState(true);

    const loadNewPage = () => {
        setLoadingPosts(true);
        setPageNumber(pageNumber + 1);
    }

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

    let feedData;
    const feedDataRef = (handleUpdate) => {
        feedData = handleUpdate;
    }

    const feedDataInvoke = (newData) => {
        if (feedData) feedData(newData);
    }

    useEffect(() => {
        axios.get(`/user/profile?username=${username}`).then(res => {
            let userData = res.data[0];
            console.log(userData);
            if (currentUser && userData.followers.includes(currentUser._id)) {
                setFollowing(true);
            };
            setLoadingFollowing(false);
            setProfileUser(res.data[0])
        })
    }, []);

    useEffect(() => {
        setLoadingPosts(true);

        let feedParams = {
            page: pageNumber,
            username: username
        }

        axios.get(`/user/posts/${currentFeed}`, {params: feedParams}).then(response => {
            console.log(response);
            feedDataInvoke(response.data);
            return response.data;
        }).catch(error => {
            console.log(error);
        });

        setLoadingPosts(false);
    }, [currentFeed]);

    return (
        <div className={'outer-container'}>
            {profileUser && <div>
                <section className={'profile-header'}>
                    <div className={'profile-banner'}>
                        <section className={'banner-overlay'}/>
                        <section className={'profile-background'}
                                 style={{backgroundImage: `url(/post/show/${profileUser.profilePic})`}}/>
                    </div>
                    <section className={'header-bars'}>
                        <section className={'header-bar-1'}>
                            <div className={'user-data'}>
                                <img className={'profile-image'} src={`/post/show/${profileUser.headerPic}`} alt={profileUser.headerPic}/>
                                <h2>{username}</h2>
                            </div>
                            <div className={'bio-container'}>
                                <span className={'bio-text'}>{profileUser.bio}</span>
                            </div>
                            <div className={'interact-buttons-container'}>
                                {(currentUser && currentUser.username === username) ?
                                <NavLink to={`/accountsettings`}
                                        className={'interact-button account-button'}>
                                    <BsGearFill size={'60%'}/>
                                    <h2>settings</h2>
                                </NavLink>
                                    : <div>
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
                                    </div>
                                }
                            </div>
                        </section>
                        <section className={'header-bar-2'}>
                            <div className={'follow-counts'}>
                                <span>Following: {profileUser.following.length}</span>
                                <span>Followers: {profileUser.followers.length}</span>
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
                        <Feed user={currentUser} feedDataRef={feedDataRef}/>
                        <div className={'search-footer'}>
                            <button className={'submit-button'} onClick={loadNewPage} disabled={loadingPosts}>
                                <span className={'load-text'}>Load More Posts</span>
                            </button>
                        </div>
                    </div>}
                </section>
            </div>}
        </div>
    )
}

export default Profile

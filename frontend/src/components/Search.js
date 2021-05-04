import './Search.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import Feed from "./Feed";
import UseFormInput from "./UseFormInput";

function Search (props) {
    let user = props.user;
    const urlParams = new URLSearchParams(window.location.search);
    const queryForm = UseFormInput(urlParams.get('q'));
    const [query, setQuery] = useState(urlParams.get('q'));
    const [pageNumber, setPageNumber] = useState(0);
    const [userData, setUserData] = useState(null);
    const [userResponseLength, setUserResponseLength] = useState(0);
    const [postResponseLength, setPostResponseLength] = useState(0);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingPosts, setLoadingPosts] = useState(true);

    let feedData;
    const feedDataRef = (handleUpdate) => {
        feedData = handleUpdate;
    }

    const feedDataInvoke = (newData, replace) => {
        if (feedData) feedData(newData, replace);
    }

    const clickTagInvoke = (tagName) => {
        setQuery(tagName);
        setPageNumber(0);
        setLoadingPosts(true);
        setLoadingUser(true);
    }

    const loadNewPage = () => {
        setPageNumber(pageNumber + 1);
        setLoadingPosts(true);
    }

    const search = () => {
        setPageNumber(0);
        setLoadingPosts(true);
        setLoadingUser(true);
        setQuery(queryForm.value);
    }

    useEffect(() => {
        if (loadingUser) {
            axios.get(`/user/search?username=${query}`).then(response => {
                setUserData(response.data[0]);
                setUserResponseLength(response.data.length);
                setLoadingUser(false);
                return response;
            }).catch(error => {
                console.log(error);
                setLoadingUser(false);
            });
        }
    }, [loadingUser]);

    useEffect(() => {
        if (loadingPosts) {
            let feedParams = {
                page: pageNumber
            }
            let replace = feedParams.page === 0;

            if (replace) {
                // TODO - Ajax call to get amount of posts with tag
            }

            axios.get(`/post/tag/${query}`, {params: feedParams}).then(response => {
                feedDataInvoke(response.data, replace);
                return response.data;
            }).catch(error => {
                console.log(error);
            });

            setLoadingPosts(false);
        }
    }, [loadingPosts]);

    return (
        <section className={'search-container'}>
            <section className={'search-module'}>
                <section className={'search-header-container'}>
                    <h2>search by user/tag</h2>
                </section>
                <section className={'search-body'}>
                    <input className={'search-results-text'} type="text" onChange={queryForm.update} placeholder={'enter search query...'}/>
                </section>
                <section className={'search-module-footer'}>
                    <button className={'submit-button'} onClick={search} disabled={loadingPosts || loadingUser}>
                        <h2>Search</h2>
                    </button>
                </section>
            </section>
            <section className={'user-results'}>
                {!loadingUser &&
                <div className={'search-section-container'}>
                    <h2 className={'search-header'}>user results for {query} ({userResponseLength})</h2>
                    <div className={'search-res-body'}>
                        {userData ?
                            <div className={'user-results'}>
                                <div className={'user-res-container'}>
                                    <div className={'user-res'}>
                                        {false && <img src={``} alt={'profile picture'}/>}
                                        <span>{userData.username}</span>
                                    </div>
                                </div>
                            </div>
                            : <div>
                                <h3>No users found</h3>
                            </div>
                        }
                    </div>
                </div>
                }
            </section>
            <section className={'post-results'}>
                <div className={'search-section-container'}>
                    <h2 className={'search-header'}>post results for {query}</h2>
                </div>
                <section>
                    <Feed user={user} query={query} setQuery={clickTagInvoke} feedDataRef={feedDataRef}/>
                    <div className={'search-footer'}>
                        <button className={'submit-button'} onClick={loadNewPage} disabled={loadingPosts}>
                            <span className={'load-text'}>Load More Posts</span>
                        </button>
                    </div>
                </section>
            </section>
        </section>
    )
}

export default Search

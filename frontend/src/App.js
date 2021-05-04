import './App.css';
import Profile from './components/Profile.js';
import Authenticator from "./components/Authenticator";
import React, {useEffect, useState} from "react";
import {BrowserRouter, Switch, Route, Redirect, NavLink} from 'react-router-dom';
import {AiOutlinePlus} from 'react-icons/ai';
import axios from "axios";
import logo from './images/logo.png';
import SearchModal from "./components/SearchModal";
import PageNotFound from "./components/PageNotFound";
import Search from "./components/Search";
import PostModal from "./components/PostModal";
import Home from "./components/Home";
import AccountSettings from "./components/AccountSettings";
import SinglePost from "./components/SinglePost";


function App() {

    const [user, setUser] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const verifyUser = () => {
        axios.post(`/user/verify`).then(res => {
            setUser(res.data);
            setLoaded(true);
        }).catch(err => {
            setLoaded(true);
        })
    }

    const logIn = (user) => {
        if (user) {
            setUser(user);
        }
        else {
            verifyUser();
        }
    }

    const logOut = () => {
        axios.post(`/user/logout`).then((resp)=>{
            console.log(resp)
        });
        setUser(null);
    }

    let authModal;
    const authModalRef = (handleOpen) => {
        authModal = handleOpen
    }

    let searchModal;
    const searchModalRef = (handleOpen) => {
        searchModal = handleOpen
    }

    let postModal;
    const postModalRef = (handleOpen) => {
        postModal = handleOpen
    }

    const openAuthModal = () => {
        if (authModal) authModal()
    }

    const openSearchModal = () => {
        if (searchModal) searchModal()
    }

    const openPostModal = () => {
        if (postModal) postModal()
    }

    useEffect(() => {
        logIn();
    }, []);

    return (
        <div className='App'>
            {loaded && <div>
                <BrowserRouter className='router'>
                    <Authenticator authModalRef={authModalRef} logIn={logIn}/>
                    <SearchModal searchModalRef={searchModalRef}/>
                    <PostModal postModalRef={postModalRef}/>
                    <div className='flex-container'>
                        <section className='flex-header'>
                            <nav className='sidebar'>
                                <NavLink to={"/"}><img className='logo' src={logo} alt='painteractive logo'/></NavLink>

                                <ul className='nav-list'>
                                    <li className={'nav-red'}>
                                        <NavLink className='nav-list-link' to={"/"}><h3>Home</h3></NavLink>
                                    </li>
                                    <li onClick={openSearchModal} className={'nav-yellow'}>
                                        <h3 className={'nav-list-link'}>Search</h3>
                                    </li>
                                    {user && <li className={'nav-green'}>
                                        <NavLink className='nav-list-link' to={`/profile/${user.username}?p=gallery`}><h3>Gallery</h3></NavLink>
                                    </li>}
                                    {user && <li className='profile nav-blue'>
                                        <NavLink className='nav-list-link' to={`/profile/${user.username}`}>
                                            <h3>{user.username}</h3></NavLink>
                                    </li>}
                                    {(user === null) ? <li onClick={openAuthModal} className={'nav-pink'}>
                                        <h3 className={'nav-list-link'}>Login/Register</h3>
                                    </li> : <li onClick={logOut} className={'nav-pink'}>
                                        <h3 className={'nav-list-link'}>Log Out</h3></li>}
                                </ul>
                            </nav>
                            <div onClick={openPostModal} className={"make-post"}>
                                <AiOutlinePlus size={'80%'}/>
                            </div>
                        </section>
                        <section className='flex-body'>
                            <Switch>
                                <Route exact path={"/"}><Home user={user} setUser={setUser}/></Route>
                                <Route path={"/profile/:username"}><Profile user={user} setUser={setUser}/></Route>
                                <Route path={"/accountsettings"}><AccountSettings user={user} verifyUser={verifyUser}/></Route>
                                <Route path={"/search"}><Search user={user} setUser={setUser}/></Route>
                                <Route path={"/post/:postid"}><SinglePost user={user} setUser={setUser}/></Route>
                                <Route path="/404"><PageNotFound/></Route>
                                <Redirect from='*' to='/404'/>
                            </Switch>
                        </section>
                    </div>
                </BrowserRouter>
            </div>}
        </div>
    );
}

export default App;

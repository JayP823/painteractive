import './App.css';
import Feed from './components/Feed.js';
import Profile from './components/Profile.js';
import Authenticator from "./components/Authenticator";
import React, {useEffect, useState} from "react";
import {BrowserRouter, Switch, Route, Redirect, NavLink} from 'react-router-dom';
import {AiOutlinePlus} from 'react-icons/ai';
import logo from './images/logo.png';
import Inbox from "./components/Inbox";
import SearchModal from "./components/SearchModal";
import Gallery from "./components/Gallery";
import PageNotFound from "./components/PageNotFound";
import Search from "./components/Search";
import PostModal from "./components/PostModal";
import axios from "axios";


function App() {

    const [user, setUser] = useState(null);

    const logIn = (user) => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
        }
    }

    const logOut = () => {
        localStorage.removeItem('user');
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
            <Authenticator authModalRef={authModalRef} logIn={logIn}/>
            <SearchModal searchModalRef={searchModalRef}/>
            <PostModal postModalRef={postModalRef}/>
            <BrowserRouter className='router'>
                <div className='flex-container'>
                    <section className='flex-header'>
                        <nav className='sidebar'>
                            <NavLink to={"/"}><img className='logo' src={logo} alt='painteractive logo'/></NavLink>

                            <ul className='nav-list'>
                                <li className={'nav-red'}>
                                    <NavLink className='nav-list-link' to={"/"}><h3>Home</h3></NavLink>
                                </li>
                                {user && <li className={'nav-yellow'}>
                                    <NavLink className='nav-list-link' to={"/messages"}><h3>Messages</h3></NavLink>
                                </li>}
                                <li onClick={openSearchModal} className={'nav-green'}>
                                    <h3>Search</h3>
                                </li>
                                {user && <li className={'nav-blue'}>
                                    <NavLink className='nav-list-link' to={"/gallery"}><h3>Gallery</h3></NavLink>
                                </li>}
                                {(user === null) ? <li onClick={openAuthModal} className={'nav-brown'}>
                                    <h3>Login/Register</h3>
                                </li> : <li onClick={logOut} className={'nav-brown'}>
                                    <h3>Log Out</h3></li>}
                                {user && <li className='profile nav-pink'>
                                    <NavLink className='nav-list-link' to={"/profile"}><h3>Profile</h3></NavLink>
                                </li>}
                            </ul>
                        </nav>
                        <div onClick={openPostModal} className={"make-post"}>
                            <AiOutlinePlus size={'80%'}/>
                        </div>
                    </section>
                    <section className='flex-body'>
                        <Switch>
                            <Route exact path={"/"}><Feed/></Route>
                            <Route path={"/profile"}><Profile user={user}/></Route>
                            <Route path={"/search"}><Search/></Route>
                            <Route path={"/messages"}><Inbox/></Route>
                            <Route path={"/gallery"}><Gallery/></Route>
                            <Route path="/404"><PageNotFound/></Route>
                            <Redirect from='*' to='/404' />
                        </Switch>
                    </section>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;

import './App.css';
import Feed from './components/Feed.js';
import Profile from './components/Profile.js';
import Authenticator from "./components/Authenticator";
import React, {useState} from "react";
import {BrowserRouter, Switch, Route, Redirect, NavLink} from 'react-router-dom';
import {AiOutlinePlus} from 'react-icons/ai';
import logo from './images/logo.png';
import Inbox from "./components/Inbox";
import SearchModal from "./components/SearchModal";
import Gallery from "./components/Gallery";
import PageNotFound from "./components/PageNotFound";
import Search from "./components/Search";
import PostModal from "./components/PostModal";

function App() {

    const [user, setUser] = useState(localStorage.getItem('user'));

    const logIn = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    }

    const logOut = () => {
        localStorage.removeItem('user');
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
                                <li style={{backgroundColor: '#dc7671'}}>
                                    <NavLink className='nav-list-link' to={"/"}>Home</NavLink>
                                </li>
                                {user && <li style={{backgroundColor: '#deef7c'}}>
                                    <NavLink className='nav-list-link' to={"/messages"}>Messages</NavLink>
                                </li>}
                                <li onClick={openSearchModal} style={{backgroundColor: '#a3ebc3'}}>
                                    Search
                                </li>
                                {user && <li style={{backgroundColor: '#5c51d6'}}>
                                    <NavLink className='nav-list-link' to={"/gallery"}>Gallery</NavLink>
                                </li>}
                                {(user === null) ? <li onClick={openAuthModal} style={{backgroundColor: '#dc84e6'}}>
                                    Login/Register
                                </li> : <li onClick={logOut} style={{backgroundColor: '#dc84e6'}}>
                                        Log Out</li>}
                                {user && <li className='profile' style={{backgroundColor: '#dc84e6'}}>
                                    <NavLink className='nav-list-link' to={"/profile"}>Profile</NavLink>
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

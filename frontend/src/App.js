import './App.css';
import Home from './components/Home.js';
import Profile from './components/Profile.js';
import Authenticator from "./components/Authenticator";
import React, {useState} from "react";
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom';
import logo from './images/logo.png';
import Inbox from "./components/Inbox";
import SearchModal from "./components/SearchModal";
import Gallery from "./components/Gallery";

function App() {

    const [loggedIn, setLoggedIn] = useState(false);

    let authModal;
    const authModalRef = (handleOpen) => {
        authModal = handleOpen
    }

    const openAuthModal = () => {
        if (authModal) authModal()
    }

    let searchModal;
    const searchModalRef = (handleOpen) => {
        searchModal = handleOpen
    }

    const openSearchModal = () => {
        if (searchModal) searchModal()
    }

    const logIn = () => {
        setLoggedIn(true);
    }

    const logOut = () => {
        setLoggedIn(false);
    }

    return (
        <div className='App'>
            <Authenticator authModalRef={authModalRef} logIn={logIn}/>
            <SearchModal searchModalRef={searchModalRef}/>
            <BrowserRouter className='router'>
                <div className='flex-container'>
                    <section className='flex-header'>
                        <nav className='sidebar'>
                            <NavLink to={"/"}><img className='logo' src={logo} alt='painteractive logo'/></NavLink>

                            <ul className='nav-list'>
                                <li style={{backgroundColor: '#dc7671'}}>
                                    <NavLink className='nav-list-link' to={"/"}>Home</NavLink>
                                </li>
                                {loggedIn && <li style={{backgroundColor: '#deef7c'}}>
                                    <NavLink className='nav-list-link' to={"/messages"}>Messages</NavLink>
                                </li>}
                                <li onClick={openSearchModal} style={{backgroundColor: '#a3ebc3'}}>
                                    Search
                                </li>
                                {loggedIn && <li style={{backgroundColor: '#5c51d6'}}>
                                    <NavLink className='nav-list-link' to={"/gallery"}>Gallery</NavLink>
                                </li>}
                                {!loggedIn && <li onClick={openAuthModal} style={{backgroundColor: '#dc84e6'}}>
                                    Login/Register
                                </li>}
                                {loggedIn && <li className='profile' style={{backgroundColor: '#dc84e6'}}>
                                    <NavLink className='nav-list-link' to={"/profile"}>Profile</NavLink>
                                </li>}
                            </ul>

                        </nav>
                    </section>
                    <section className='flex-body'>
                        <Switch>
                            <Route exact path={"/"}><Home/></Route>
                            <Route path={"/profile"}><Profile/></Route>
                            <Route path={"/messages"}><Inbox/></Route>
                            <Route path={"/gallery"}><Gallery/></Route>
                        </Switch>
                    </section>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;

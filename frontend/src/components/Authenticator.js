import './Authenticator.css'
import React, {useState} from 'react';
import Modal from 'react-modal';
import axios from "axios";
import customModalStyles from "./CustomModalStyles";
import UseFormInput from "./UseFormInput";
import {AiOutlineClose} from "react-icons/ai";
import {RiArrowGoBackLine} from "react-icons/ri";
const dotenv = require('dotenv').config();

function Authenticator (props) {
    const [isOpen, setIsOpen] = useState(false);
    const [registering, setRegistering] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
        leaveRegistration();
    }

    const enterRegistration = () => {
        setRegistering(true);
    }

    const leaveRegistration = () => {
        setRegistering(false);
    }

    props.authModalRef(openModal)

    const invokeLogIn = (user) => {
        props.logIn(user);
        closeModal();
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} style={customModalStyles} appElement={document.getElementById('root')}>
            <div className={'auth-modal-flex'}>
                <section className={'modal-header'}>
                    <h2>{!registering ? 'Log In' : 'Register'}</h2>
                    <div>
                        {registering && <RiArrowGoBackLine onClick={leaveRegistration} size={'30px'}/>}
                        <AiOutlineClose onClick={closeModal} size={'30px'}/>
                    </div>
                </section>
                <section className={'auth-modal-body'}>
                    {!registering ? <Login enterRegistration={enterRegistration} invokeLogIn={invokeLogIn}/> : <Register leaveRegistration={leaveRegistration}/>}
                </section>
            </div>
        </Modal>
    )
}

function Login (props) {
    const username = UseFormInput('');
    const password = UseFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setError(null);
        setLoading(true);
        axios.post(`/user/authenticate`, { username: username.value, password: password.value }).then(response => {
            setLoading(false);
            props.invokeLogIn(response.data);
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
        });
    }

    return (
        <div>
            <div className={'auth-text-container'}>
                Username<br />
                <input className={'auth-text'} type="text" onChange={username.update} placeholder={'username'}/>
            </div>
            <div className={'auth-text-container'}>
                Password<br />
                <input className={'auth-text'} type="password" onChange={password.update} placeholder={'password'}/>
            </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <section className={'auth-modal-footer'}>
                <button className={'submit-button'} disabled={loading} onClick={handleLogin}>
                    <h2>{loading ? 'Logging In...' : 'Log In'}</h2>
                </button>
                <button className={'submit-button'} onClick={props.enterRegistration}>
                    <h2>Register</h2>
                </button>
            </section>
        </div>
    )
}

function Register (props) {
    const username = UseFormInput('');
    const password = UseFormInput('');
    const email = UseFormInput('');
    const firstName = UseFormInput('');
    const lastName = UseFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = () => {
        setError(null);
        setLoading(true);
        axios.post(`/user/register`, { username: username.value, password: password.value, email: email.value, firstName: firstName.value, lastName: lastName.value }).then(response => {
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
        });
    }

    return (
        <div>
            <div className={'auth-text-container'}>
                Username<br />
                <input className={'auth-text'} type="text" onChange={username.update} placeholder={'username'}/>
            </div>
            <div className={'auth-text-container'}>
                Password<br />
                <input className={'auth-text'} type="password" onChange={password.update} placeholder={'password'}/>
            </div>
            <div className={'auth-text-container'}>
                Email Address<br />
                <input className={'auth-text'} type="text" onChange={email.update} placeholder={'example@domain.com'}/>
            </div>
            <div className={'auth-text-container'}>
                First Name<br />
                <input className={'auth-text'} type="text" onChange={firstName.update} placeholder={'john'}/>
            </div>
            <div className={'auth-text-container'}>
                Last Name<br />
                <input className={'auth-text'} type="text" onChange={lastName.update} placeholder={'doe'}/>
            </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <section className={'auth-modal-footer'}>
                <button className={'submit-button'} onClick={handleRegister}>
                    <h2>{loading ? 'Registering...' : 'Register'}</h2>
                </button>
                <button className={'submit-button'} onClick={props.leaveRegistration}>
                    <h2>Go Back</h2>
                </button>
            </section>
        </div>
    )
}

export default Authenticator

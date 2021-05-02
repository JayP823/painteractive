import './Authenticator.css'
import React, {useState} from 'react';
import Modal from 'react-modal';
import axios from "axios";
import customModalStyles from "./CustomModalStyles";
import UseFormInput from "./UseFormInput";
const dotenv = require('dotenv').config();

function Authenticator (props) {
    const [isOpen, setIsOpen] = useState(false);
    const [registering, setRegistering] = useState(false);
    //const [token, setToken] = useState(storedJwt || null);

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
            {registering ?
                <div>
                    <Register/>
                    <button onClick={leaveRegistration}>Go Back</button>
                </div>
                : <div>
                    <Login invokeLogIn={invokeLogIn}/>
                    <button onClick={enterRegistration}>Register Here</button>
                </div>}
            <button onClick={closeModal}>close</button>
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
            //TODO - setUserSession(response.data.token, response.data.user);
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
        });
    }

    return (
        <div>
            Login<br /><br />
            <div>
                Username<br />
                <input type="text" onChange={username.update}/>
            </div>
            <div style={{ marginTop: 10 }}>
                Password<br />
                <input type="password" onChange={password.update}/>
            </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
        </div>
    )
}

function Register () {
    const username = UseFormInput('');
    const password = UseFormInput('');
    const email = UseFormInput('');
    const firstName = UseFormInput('');
    const lastName = UseFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = () => {
        // TODO - Check fields for validity
        setError(null);
        setLoading(true);
        axios.post(`/user/register`, { username: username.value, password: password.value, email: email.value, firstName: firstName.value, lastName: lastName.value }).then(response => {
            setLoading(false);
            console.log("gaming");
            //TODO - setUserSession(response.data.token, response.data.user);
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
        });
    }

    return (
        <div>
            Register<br /><br />
            <div>
                Username<br />
                <input type="text" onChange={username.update}/>
            </div>
            <div style={{ marginTop: 10 }}>
                Password<br />
                <input type="password" onChange={password.update}/>
            </div>
            <div style={{ marginTop: 10 }}>
                Email Address<br />
                <input type="text" onChange={email.update}/>
            </div>
            <div style={{ marginTop: 10 }}>
                First Name<br />
                <input type="text" onChange={firstName.update}/>
            </div>
            <div style={{ marginTop: 10 }}>
                Last Name<br />
                <input type="text" onChange={lastName.update}/>
            </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <input type="button" value={loading ? 'Loading...' : 'Register'} onClick={handleRegister} disabled={loading} /><br />
        </div>
    )
}

export default Authenticator

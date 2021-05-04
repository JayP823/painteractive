import './AccountSettings.css'
import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import UseFormInput from "./UseFormInput";
import {NavLink} from "react-router-dom";
import {useDropzone} from "react-dropzone";

function AccountSettings (props) {
    let user = props.user;
    let history = useHistory();
    if (user === null) history.push('/');
    const username = UseFormInput('');
    const password = UseFormInput('');
    const email = UseFormInput('');
    const firstName = UseFormInput('');
    const lastName = UseFormInput('');
    const bio = UseFormInput(() => {if (user && user.bio) {return user.bio} else return ''});
    const [loaded, setLoaded] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const [headerImage, setHeaderImage] = useState('');

    const handleUpdate = () => {
        setUpdating(true);

        const updateData = new FormData();
        if (username.value !== '') updateData.append('newUsername', username.value);
        if (password.value !== '') updateData.append('newPassword', password.value);
        if (email.value !== '') updateData.append('newEmail', email.value);
        if (firstName.value !== '') updateData.append('newFirstName', firstName.value);
        if (lastName.value !== '') updateData.append('newLastName', lastName.value);
        if (bio.value !== user.bio) updateData.append('newBio', bio.value);
        if (profileImage !== user.profilePic) updateData.append('avatar', profileImage);
        if (headerImage !== user.headerPic) updateData.append('header', headerImage);

        axios.post(`/user/update`, updateData).then(response => {
            props.verifyUser();
            setUpdating(false);
        }).catch(error => {
            console.log(error);
            setUpdating(false);
        });
    }

    const onDropProfile = (acceptedFiles) => {
        setProfileImage(acceptedFiles[0]);
    }

    const onDropHeader = (acceptedFiles) => {
        setHeaderImage(acceptedFiles[0]);
    }

    useEffect(() => {
        if (user) {
            setProfileImage(user.profilePic);
            setHeaderImage(user.headerPic);
            setLoaded(true);
        }
    }, [])

    return (
        <div className='account-settings-wrapper'>
            {(loaded && user) &&
            <div className={'account-settings-padding'}>
                <h2>account settings</h2>
                <div className={'image-dropzones'}>
                    <AccountSettingsDropzone user={user} image={profileImage} onDrop={onDropProfile}/>
                    <AccountSettingsDropzone user={user} image={headerImage} onDrop={onDropHeader}/>
                </div>
                <div className={'auth-text-container'}>
                    Bio<br/>
                    <input className={'auth-text'} type="text" onChange={bio.update} value={bio.value} placeholder={'enter bio here...'}/>
                </div>
                <div className={'auth-text-container'}>
                    Username<br/>
                    <input className={'auth-text'} type="text" onChange={username.update} placeholder={user.username}/>
                </div>
                <div className={'auth-text-container'}>
                    Password<br/>
                    <input className={'auth-text'} type="password" onChange={password.update} placeholder={'new password'}/>
                </div>
                <div className={'auth-text-container'}>
                    Email Address<br/>
                    <input className={'auth-text'} type="text" onChange={email.update}
                           placeholder={user.email}/>
                </div>
                <div className={'auth-text-container'}>
                    First Name<br/>
                    <input className={'auth-text'} type="text" onChange={firstName.update} placeholder={user.firstName}/>
                </div>
                <div className={'auth-text-container'}>
                    Last Name<br/>
                    <input className={'auth-text'} type="text" onChange={lastName.update} placeholder={user.lastName}/>
                </div>
                <section className={'auth-modal-footer'}>
                    <button className={'submit-button'} disabled={updating} onClick={handleUpdate}>
                        <h2>{updating ? 'Updating...' : 'Update'}</h2>
                    </button>
                    <NavLink className={'clear-decoration'} to={`/profile/${user.username}`}>
                        <button className={'submit-button'} onClick={props.leaveRegistration}>
                            <h2>Go Back</h2>
                        </button>
                    </NavLink>
                </section>
            </div>
            }
        </div>
    )
}

function AccountSettingsDropzone (props) {
    let user = props.user;
    let image = props.image;
    let onDrop = props.onDrop;

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({multiple: false, noKeyboard: true, accept: 'image/*', onDrop});

    return (
        <section {...getRootProps({className: 'account-image-selector'})}>
            <input {...getInputProps()}/>
            {(image === user.profilePic || image === user.headerPic) ?
                <img className={'profile-thumbnail'} src={`/post/show/${image}`} alt={image}/>
                : <img className={'profile-thumbnail'} src={URL.createObjectURL(image)} alt={image}/>
            }
            <span className={'change-picture-text'}>change picture</span>
        </section>
    )
}

export default AccountSettings

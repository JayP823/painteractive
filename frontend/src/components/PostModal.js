import './PostModal.css'
import React, {useState} from 'react';
import Modal from 'react-modal';
import {useDropzone} from 'react-dropzone';
import axios from "axios";
import {AiOutlineUpload, AiOutlineClose, AiOutlineArrowRight} from "react-icons/ai";
import customModalStyles from "./CustomModalStyles";
import UseFormInput from "./UseFormInput";
import Tag from "./Tag";
const dotenv = require('dotenv').config();

function PostModal (props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [image, setImage] = useState(null);
    const [hasTextField, setHasTextField] = useState(false);
    const [tags, setTags] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const textDescription = UseFormInput('');
    const currentTagField = UseFormInput('');

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
        leaveEditing();
    }

    const enterEditing = (hasText) => {
        setHasTextField(hasText)
        setEditing(true);
    }

    const leaveEditing = () => {
        setEditing(false);
        setImage(null);
        setHasTextField(false);
    }

    const addTag = () => {
        let newTags = tags;
        newTags.push(currentTagField.value);
        setTags(newTags);
    }

    const submit = () => {

    }

    const onDrop = (acceptedFiles) => {
        setImage(acceptedFiles[0]);
        setEditing(true);
    }

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({multiple: false, noKeyboard: true, accept: 'image/*', onDrop});

    props.postModalRef(openModal);

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} style={customModalStyles} appElement={document.getElementById('root')}>
            <div className={'modal-flex'}>
                <section className={'modal-header'}>
                    <div className={'header-1'}><h2>make new post{(editing && image) && (' - ' + image.name)}{(editing && !image) && ' - text post'}</h2>{editing && <AiOutlineClose onClick={leaveEditing} size={'20px'}/>}</div>
                    <AiOutlineClose onClick={closeModal} size={'30px'}/>
                </section>
                {!editing && <section {...getRootProps({className: 'modal-body'})} className={'modal-body'}>
                    <input {...getInputProps()}/>
                    <AiOutlineUpload className={'post-icon'} size={'30%'}/>
                    <h1 className={'post-body-main-text'}>upload image from device</h1>
                    <h2>(or drag and drop)</h2>
                </section>}
                {!editing && <section className={'modal-footer'}>
                    <h3 onClick={() => {enterEditing(true)}} className={'text-only white'}>text-only post</h3>
                </section>}
                {editing && <section className={'editing-body'}>
                    {image && <section className='thumbnail-image'>
                        <img className={'thumbnail'} src={URL.createObjectURL(image)} alt={image.name}/>
                        </section>}
                    {!hasTextField ? <h3 className={'add-text-desc'} onClick={() => {setHasTextField(true)}}>add text description</h3>
                        : <div className={'text-desc-container'}>
                            <input className={'text-description'} type="text" onChange={textDescription.update}
                                    placeholder="text description"/>
                            {image && <AiOutlineClose onClick={() => {setHasTextField(false)}} size={'30px'}/>}
                        </div>}
                    <section className={'tag-container'}>
                        <h3>add tags ({tags.length}/3)</h3>
                        <div className={'tag-selector'}>
                            {tags.map((tag, index) => {
                                return <Tag tagName={tag} hasLink={false} highlighted={false} key={'tag-' + index}/>
                            })}
                            {(tags.length < 3) && <div className={'tag-add-module'}>
                                <input id={'tag-text-field'} type="text" onChange={currentTagField.update} placeholder="enter tag"/>
                                {currentTagField.value !== '' &&
                                <div onClick={addTag} className={"add-tag"}>
                                    <AiOutlineArrowRight size={'80%'}/>
                                </div>}
                            </div>}
                        </div>
                    </section>
                    <section className={'submit-container'}>
                        <button onClick={submit}></button>
                    </section>
                </section>}
            </div>
        </Modal>
    )
}

export default PostModal

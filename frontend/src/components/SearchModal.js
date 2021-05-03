import './SearchModal.css'
import React, {useState} from 'react';
import Modal from 'react-modal';
import customModalStyles from "./CustomModalStyles";
import UseFormInput from "./UseFormInput";
import {AiOutlineClose} from "react-icons/ai";
import {NavLink} from "react-router-dom";

function SearchModal (props) {
    const [isOpen, setIsOpen] = useState(false);
    const query = UseFormInput('');

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    props.searchModalRef(openModal);

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} style={customModalStyles} appElement={document.getElementById('root')}>
            <div className={'search-modal-flex'}>
                <section className={'modal-header'}>
                    <h2>search</h2>
                    <div>
                        <AiOutlineClose onClick={closeModal} size={'30px'}/>
                    </div>
                </section>
                <section className={'search-modal-body'}>
                    <input className={'search-text'} type="text" onChange={query.update} placeholder={'enter search query...'}/>
                </section>
                <section className={'search-modal-footer'}>
                    <NavLink onClick={closeModal} className={'submit-button'} to={`/search?q=${query.value}`}>
                        <h2>Search</h2>
                    </NavLink>
                </section>
            </div>
        </Modal>
    )
}

export default SearchModal

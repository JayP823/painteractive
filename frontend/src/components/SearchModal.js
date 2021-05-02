import './SearchModal.css'
import React, {useState} from 'react';
import Modal from 'react-modal';
import customModalStyles from "./CustomModalStyles";
import axios from "axios";
import UseFormInput from "./UseFormInput";

function SearchModal (props) {
    const [isOpen, setIsOpen] = useState(false);
    const query = UseFormInput('');

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const search = () => {
        // TODO - Make ajax call to the back end to get search results.
    }

    props.searchModalRef(openModal);

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} style={customModalStyles} appElement={document.getElementById('root')}>
            Search<br /><br />
            <div>
                <input type="text" onChange={query.update} placeholder="enter search query..."/>
            </div>
            <button onClick={search}>search</button>
            <button onClick={closeModal}>close</button>
        </Modal>
    )
}

export default SearchModal

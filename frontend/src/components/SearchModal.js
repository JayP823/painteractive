import './SearchModal.css'
import React, {useState} from 'react';
import Modal from 'react-modal';
import axios from "axios";

const customModalStyles = {
    content: {
        top            : '40%',
        left           : '50%',
        right          : 'auto',
        bottom         : 'auto',
        marginRight    : '-50%',
        transform      : 'translate(-50%, -40%)',
        backgroundColor: '#b4a7d6'
    }
}

function SearchModal (props) {
    const [isOpen, setIsOpen] = useState(false);
    const query = useFormInput('');

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

const useFormInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const updateHandler = (e) => {
        setValue(e.target.value);
    }

    return {
        value: value,
        update: updateHandler
    }
}

export default SearchModal

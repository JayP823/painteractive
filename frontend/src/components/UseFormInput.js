import './UseFormInput.css';
import {useState} from "react";

const UseFormInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const updateHandler = (e) => {
        setValue(e.target.value);
    }

    return {
        value: value,
        update: updateHandler
    }
}

export default UseFormInput

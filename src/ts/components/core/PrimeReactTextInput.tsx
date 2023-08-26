import React from "react";
import PropTypes from 'prop-types'
import { InputText } from 'primereact/inputtext';

type Props = {
    value?: string;
}

const PrimeReactTextInput = (props: Props) => {
    return (
        <InputText value={props.value} />
    ); 
}

PrimeReactTextInput.propTypes = {
    value: PropTypes.string
}

export default PrimeReactTextInput;
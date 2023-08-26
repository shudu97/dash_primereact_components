import React, { useState } from "react";
import PropTypes from 'prop-types'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import { InputText as PrimeReactInputText} from 'primereact/inputtext';


type Props = {
    value?: string;
    placeholder?: string; 
}

const InputText = (props: Props) => {
    const [value, setValue] = useState(props.value);
    
    return (
        <PrimeReactInputText
            value={value} 
            placeholder={props.placeholder}
            onChange={(e) => setValue(e.target.value)}
        />
    ); 
}

InputText.propTypes = {
    value: PropTypes.string, 
    placeholder: PropTypes.string
}

export default InputText;
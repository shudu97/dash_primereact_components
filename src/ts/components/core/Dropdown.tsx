import React, { useState, useEffect } from "react";
import { Dropdown as PrimeReactDropdown } from 'primereact/dropdown'
import { SelectItemOptionsType } from "primereact/selectitem";

type Props = {
    setProps: Function; 
    id?: string; 
    value?: string; 
    options?: SelectItemOptionsType; 
    placeholder?: string; 
    editable?: boolean
}

const Dropdown = (props: Props) => {
    const {
        setProps, 
        id, 
        value, 
        options, 
        placeholder, 
        editable, 
        ...other
    } = props; 

    const [val, setValue] = useState(value)

    useEffect(() => {
        setValue(value); 
    }, [value]); 

    const handleChange = (e) => {
        const newValue = e.value;
        setValue(newValue);
        if (setProps) {
            setProps({ value: newValue });
        }
    };

    return (
        <PrimeReactDropdown
            id={id}
            value={val}
            onChange={handleChange}
            options={options}
            optionLabel="label"
            optionValue="value"
            optionGroupLabel="label"
            optionGroupChildren="items"
            placeholder={placeholder}
            editable={editable}        
        />
    )
}

export default Dropdown
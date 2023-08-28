import React, { useState, useEffect } from "react";
import { Dropdown as PrimeReactDropdown } from 'primereact/dropdown'
import { SelectItemOptionsType } from "primereact/selectitem";
import { VirtualScrollerProps } from "primereact/virtualscroller";

type Props = {
    setProps: Function; 
    id?: string; 
    value?: string; 
    options?: SelectItemOptionsType; 
    placeholder?: string; 
    editable?: boolean; 
    filter?: boolean; 
    showclear?: boolean;
    virtual_scroller_props?: VirtualScrollerProps
}

const Dropdown = (props: Props) => {
    const {
        setProps, 
        id, 
        value, 
        options, 
        placeholder, 
        editable, 
        filter, 
        showclear, 
        virtual_scroller_props, 
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
            filter={filter}  
            showClear={showclear}
            virtualScrollerOptions={virtual_scroller_props}
        />
    )
}

export default Dropdown
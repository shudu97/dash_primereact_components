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
    virtual_scroller_props?: VirtualScrollerProps; 
    label?: string; 
    floating_label?: boolean
    valid?: boolean
    disabled?: boolean
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
        label, 
        floating_label,
        valid, 
        disabled, 
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
        <div className={`flex flex-column gap-2`}>
            {label && floating_label === false ? <label htmlFor={id}>{label}</label> : null}
            <div>
                <span className={`${floating_label ? 'p-float-label' : ''}`}>
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
                        className={`${valid === false ? 'p-invalid' : ''}`}
                        disabled={disabled}
                        {...other}
                    />
                    {label && floating_label === true ? <label htmlFor={id}>{label}</label> : null}
                </span>
            </div>
        </div>
    )
}

export default Dropdown
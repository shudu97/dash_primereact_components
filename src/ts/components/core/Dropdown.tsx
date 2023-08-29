import React, { useState, useEffect } from "react";
import { Dropdown as PrimeReactDropdown } from 'primereact/dropdown'
import { SelectItemOptionsType } from "primereact/selectitem";
import { VirtualScrollerProps } from "primereact/virtualscroller";
import { TooltipOptions } from "primereact/tooltip/tooltipoptions";

type Props = {
    setProps: Function; 
    id?: string; 
    value?: string; 
    options?: SelectItemOptionsType; 
    placeholder?: string; 
    editable?: boolean; 
    filter?: boolean; 
    filter_match_mode?; 
    filter_placeholder?: string; 
    show_filter_clear?: boolean; 
    show_clear?: boolean;
    show_on_focus?: boolean; 
    virtual_scroller_props?: VirtualScrollerProps; 
    label?: string; 
    floating_label?: boolean; 
    required?: boolean; 
    valid?: boolean; 
    disabled?: boolean;
    scroll_height?: string; 
    tooltip?: string; 
    tooltip_options?: TooltipOptions
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
        filter_match_mode, 
        filter_placeholder, 
        show_filter_clear, 
        show_clear, 
        show_on_focus, 
        virtual_scroller_props, 
        label, 
        floating_label,
        required, 
        valid, 
        disabled,
        scroll_height, 
        tooltip, 
        tooltip_options, 
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
                        filterMatchMode={filter_match_mode}
                        filterPlaceholder={filter_placeholder}
                        showFilterClear={show_filter_clear}
                        showClear={show_clear}
                        showOnFocus={show_on_focus}
                        virtualScrollerOptions={virtual_scroller_props}
                        required={required}
                        className={`${valid === false ? 'p-invalid' : ''}`}
                        disabled={disabled}
                        scrollHeight={scroll_height}
                        tooltip={tooltip}
                        tooltipOptions={tooltip_options}
                        {...other}
                    />
                    {label && floating_label === true ? <label htmlFor={id}>{label}</label> : null}
                </span>
            </div>
        </div>
    )
}

export default Dropdown
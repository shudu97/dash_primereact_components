import React, { useState, useEffect } from "react";
import { Dropdown as PrimeReactDropdown, DropdownPassThroughOptions } from 'primereact/dropdown'
import { SelectItemOptionsType } from "primereact/selectitem";
import { VirtualScrollerProps } from "primereact/virtualscroller";
import { TooltipOptions } from "primereact/tooltip/tooltipoptions";

type Props = {
    /** Function to update the properties from the parent component */
    setProps: Function; 
    /** Unique identifier for the Dropdown component */
    id?: string; 
    /** The value of the selected item */
    value?: string; 
    /** The options available for selection */
    options?: SelectItemOptionsType; 
    /** Placeholder text displayed when no value is selected */
    placeholder?: string; 
    /** Boolean to control if the value can be manually edited */
    editable?: boolean; 
    /** Boolean to enable or disable filtering */
    filter?: boolean; 
    /** The mode for matching items in filter */
    filter_match_mode?; 
    /** Placeholder text for the filter input */
    filter_placeholder?: string; 
    /** Boolean to show or hide the filter clear button */
    show_filter_clear?: boolean; 
    /** Boolean to show or hide the dropdown clear button */
    show_clear?: boolean;
    /** Boolean to control if the dropdown should show on focus */
    show_on_focus?: boolean; 
    /** Props related to virtual scrolling */
    virtual_scroller_props?: VirtualScrollerProps; 
    /** Label displayed above the dropdown */
    label?: string; 
    /** Boolean to enable or disable floating label */
    floating_label?: boolean; 
    /** Boolean to mark the dropdown as required */
    required?: boolean; 
    /** Boolean to indicate the validity of the dropdown */
    valid?: boolean; 
    /** Boolean to enable or disable the dropdown */
    disabled?: boolean;
    /** Controls the scroll height of the dropdown list */
    scroll_height?: string; 
    /** Text for the tooltip */
    tooltip?: string; 
    /** Options to customize the tooltip */
    tooltip_options?: TooltipOptions; 
    /** Additional pass-through options specific to the Dropdown */
    pt?: DropdownPassThroughOptions; 
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
        pt, 
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
                        pt={pt}
                        {...other}
                    />
                    {label && floating_label === true ? <label htmlFor={id}>{label}</label> : null}
                </span>
            </div>
        </div>
    )
}

export default Dropdown
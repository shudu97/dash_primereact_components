import React, { useState, useEffect } from "react";
import { CascadeSelect as PrimeReactCascadeSelect, CascadeSelectPassThroughOptions, CascadeSelectProps} from 'primereact/cascadeselect'
import { SelectItemOptionsType } from "primereact/selectitem";
import { IconType } from "primereact/utils";

type Props = {
    /** Function to update parent component state */
    setProps: Function; 

    /** ID of the component */
    id?: string; 
    
    /** Current selected value */
    value?: string; 
    
    /** Placeholder text displayed when no option is selected */
    placeholder?: string;  
    
    /** Options for the select dropdown */
    options: SelectItemOptionsType; 

    /** Property to use for the label of each option */
    option_label?: string; 
    
    /** Property to use for the value of each option */
    option_value?: string; 
    
    /** Property to use for the label of each option group */
    option_group_label?: string; 
    
    /** Property to specify the children of each option group */
    option_group_children: string[]; 
    
    /** Label for the CascadeSelect component */
    label?: string; 
    
    /** Flag to enable floating label */
    floating_label?: boolean; 
    
    /** The height for the scrollable options container */
    scroll_height?: string; 
    
    /** The icon to display on the dropdown button */
    dropdown_icon?: IconType<CascadeSelectProps>; 
    
    /** Indicates whether the input is valid */
    valid?: boolean; 
    
    /** Indicates whether the component is disabled */
    disabled?: boolean; 
    
    /** Any other pass-through options for PrimeReact CascadeSelect */
    pt?: CascadeSelectPassThroughOptions; 
}

/**
 * 
 * CascadeSelect is a custom Dash Component 
 * built on top of PrimeReact's CascadeSelect Component.
 */

const CascadeSelect = (props: Props) => {
    const {
        setProps, 
        id, 
        value,
        placeholder, 
        options, 
        option_label, 
        option_value, 
        option_group_label, 
        option_group_children, 
        label, 
        floating_label, 
        scroll_height, 
        dropdown_icon, 
        valid, 
        disabled, 
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
                    <PrimeReactCascadeSelect
                        id={id}
                        value={val}
                        onChange={handleChange}
                        options={options}
                        optionLabel={option_label}
                        optionValue={option_value}
                        optionGroupLabel={option_group_label}
                        optionGroupChildren={option_group_children}
                        scrollHeight={scroll_height}
                        dropdownIcon={dropdown_icon}
                        className={`${valid === false ? 'p-invalid' : ''}`}
                        disabled={disabled}
                        pt={pt}
                        {...other}
                    />            
                    {label && floating_label === true ? <label htmlFor={id}>{label}</label> : null}
                </span>
            </div>
        </div>
    )


}

CascadeSelect.defaultProps = {
    option_label: 'label', 
    option_value: 'value', 
    option_group_label: 'label'
}



export default CascadeSelect


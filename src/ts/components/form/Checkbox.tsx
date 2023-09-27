import React from "react";
import { Checkbox as PrimeReactCheckbox, CheckboxProps, CheckboxPassThroughOptions } from "primereact/checkbox"
import { TooltipOptions } from "primereact/tooltip/tooltipoptions";
import { IconType } from "primereact/utils";

type Props = {
    /** Function to update the component props */
    setProps: Function; 
    
    /** ID of the checkbox component */
    id?: string; 
    
    /** Indicates whether the checkbox is checked or not */
    checked: boolean; 
    
    /** Label displayed next to the checkbox */
    label?: string; 
    
    /** The value represented by the checkbox component */
    value?; 
    
    /** The value represented by the checkbox when it is checked */
    true_value?; 
    
    /** The value represented by the checkbox when it is not checked */
    false_value?; 
    
    /** Specifies whether the checkbox should be disabled */
    disabled?: boolean;
    
    /** Specifies whether the checkbox should be required */
    required?: boolean;
    
    /** Specifies whether the checkbox is read-only */
    read_only?: boolean;
    
    /** Specifies whether the checkbox is valid */
    valid?: boolean;
    
    /** Icon to be displayed in the checkbox */
    icon?: IconType<CheckboxProps>;
    
    /** Tooltip text to be displayed on hover */
    tooltip?: string;
    
    /** Options for configuring the tooltip */
    tooltip_options?: TooltipOptions;
    
    /** PassThrough options for the checkbox */
    pt?: CheckboxPassThroughOptions;
}

/**
 * Dropdown is a custom Dash Component
 * built on top of PrimeReact's Checkbox Component. 
 */

const Checkbox = (props: Props) => {
    const {
        setProps, 
        id, 
        checked, 
        label, 
        value, 
        true_value, 
        false_value, 
        disabled, 
        required, 
        read_only, 
        valid, 
        icon, 
        tooltip, 
        tooltip_options, 
        pt, 
        ...other
    } = props; 

    const onChange = e => {
        if (setProps) {
            setProps({checked: e.checked})
        }
    }; 

    return (
        <div className="flex align-items-center">
            <PrimeReactCheckbox
                id={id}
                inputId={`input-${id}`}
                checked={checked}
                onChange={onChange}
                value={value}
                trueValue={true_value}
                falseValue={false_value}
                disabled={disabled}
                required={required}
                readOnly={read_only}
                icon={icon}
                tooltip={tooltip}
                tooltipOptions={tooltip_options}
                className={`${valid === false ? 'p-invalid' : ''}`}
                pt={pt}
                {...other}
            />
            <label htmlFor={`input-${id}`} style={{ marginLeft: '8px' }}>{label}</label>
        </div>
    )
}

Checkbox.defaultProps = {
    checked: false, 
    true_value: true, 
    false_value: false, 
    disabled: false
}

export default Checkbox; 
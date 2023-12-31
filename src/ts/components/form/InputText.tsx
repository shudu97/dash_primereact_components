import React, { ReactNode, useState, useEffect } from "react";
import { InputText as PrimeReactInputText, InputTextPassThroughOptions } from 'primereact/inputtext';
import { KeyFilterType } from "primereact/keyfilter";
import { TooltipOptions } from "primereact/tooltip/tooltipoptions";

type Props = {
    /** Function to update component state */
    setProps: Function; 
    /** HTML id attribute for the input element */
    id?: string; 
    /** Current Value of the Input */ 
    value?: string; 
    /** Placeholder Text when the input is empty */
    placeholder?: string; 
    /** Type of key filter to use, limiting what characters can be entered */
    keyfilter?: KeyFilterType; 
    /** Label text displayed above the input */
    label?: string;
    /** Whether to make the label floating */
    floating_label?: boolean;
    /** Helper text displayed below the input */
    help_text?: string;
    /** Size of the input, can be small, medium, or large */
    input_size?: 'sm' | 'md' | 'lg'; 
    /** Tooltip text to display on hover */
    tooltip?: string; 
    /** Additional options for tooltip display */ 
    tooltip_options?: TooltipOptions;  
    /** Optional icon to display in the input */
    icon?: ReactNode;  
    /** Position of the icon inside the input */ 
    icon_position?: 'left' | 'right';  
    /** Indicates if the input is in a valid state */
    valid?: boolean;
    /** Whether the input is disabled or not */
    disabled?: boolean;
    /** Pass Through Options to component inside */
    pt?: InputTextPassThroughOptions
}

/**
 * InputText is a custom Dash Component 
 * built on top of PrimeReact's InputText Component. 
*/

const InputText = (props: Props) => {
    const {
        setProps, 
        id, 
        value,
        placeholder,
        keyfilter,
        label,
        floating_label,
        help_text,
        input_size,
        tooltip,
        tooltip_options,
        icon, 
        icon_position, 
        valid,
        disabled, 
        pt, 
        ...other
    } = props;

    const [val, setValue] = useState(value || ""); // initialize value
    
    useEffect(() => {
      setValue(value); // update value when props.value changes
    }, [value]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        if (setProps) {
            setProps({ value: newValue });
        }
    };
    
    return (
        <div className={`flex flex-column gap-2`}>
            {label && floating_label === false ? <label htmlFor={id}>{label}</label> : null}
            <div>
                <span className={`${icon ? `p-input-icon-${icon_position}` : ''} ${floating_label ? 'p-float-label' : ''}`}>
                    {icon ? icon : null}
                    <PrimeReactInputText
                        disabled={disabled}
                        id={id}
                        value={val} 
                        placeholder={placeholder} 
                        onChange={handleChange}
                        keyfilter={keyfilter}
                        tooltip={tooltip}
                        tooltipOptions={tooltip_options}
                        className={`p-inputtext-${input_size} ${valid === false ? 'p-invalid' : ''}`}
                        aria-describedby={help_text ? `help-${id}`: undefined}
                        pt={pt}
                        {...other}
                    />
                    {label && floating_label === true ? <label htmlFor={id}>{label}</label> : null}
                </span>
            </div>
            {help_text ? <small id={`help-${id}`}>{help_text}</small> : null}
        </div>
    ); 
}

InputText.defaultProps = {
    icon_position: 'left', 
    input_size: 'md', 
    floating_label: false
}

export default InputText;
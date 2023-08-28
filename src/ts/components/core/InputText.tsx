import React, { ReactNode, useState, useEffect } from "react";
import PropTypes from 'prop-types'
import { InputText as PrimeReactInputText} from 'primereact/inputtext';
import { KeyFilterType } from "primereact/keyfilter";
import { TooltipOptions } from "primereact/tooltip/tooltipoptions";

type Props = {
    setProps: Function; 
    id?: string; 
    value?: string;
    placeholder?: string;
    keyfilter?: KeyFilterType; 
    tooltip?: string;
    tooltip_options?: TooltipOptions; 
    icon?: ReactNode; 
    icon_position?: 'left' | 'right'; 
    className?: string; 
    label?: string;
    help_text?: string; 
    input_size?: 'sm' | 'md' | 'lg'; 
    disabled?: boolean
    valid?: boolean, 
    floating_label?: string
}

/**
 * InputText is a custom Dash Component built on top of PrimeReact's Input Text Component. 
 *
 */

const InputText = (props: Props) => {
    const {
        setProps, 
        id, 
        value,
        placeholder,
        keyfilter,
        tooltip,
        tooltip_options,
        icon, 
        icon_position, 
        className,
        label,
        help_text,
        input_size,
        disabled,
        valid,
        floating_label,
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
            <label htmlFor={id}>{label}</label>
            <div>
                <span className={`p-input-icon-${icon_position} p-float-label`}>
                    {icon}
                    <PrimeReactInputText
                        disabled={disabled}
                        id={id}
                        value={val} 
                        placeholder={placeholder} 
                        onChange={handleChange}
                        keyfilter={keyfilter}
                        tooltip={tooltip}
                        tooltipOptions={tooltip_options}
                        className={`${className} p-inputtext-${input_size} ${valid === false ? 'p-invalid' : ''}`}
                        aria-describedby={`help-${id}`}
                        {...other}
                    />
                    <label htmlFor={id}>{floating_label}</label>
                </span>
            </div>
            <small id={`help-${id}`}>{help_text}</small>
        </div>
    ); 
}

InputText.defaultProps = {
    icon_position: 'left', 
    input_size: 'md'
}

export default InputText;
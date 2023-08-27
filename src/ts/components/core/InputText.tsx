import React, { ReactNode, useState, useEffect } from "react";
import PropTypes from 'prop-types'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/saga-blue/theme.css'

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
    iconPosition?: string; 
    className: string; 
    label: string;
    help_text: string; 
}

/**
 * InputText is a custom Dash Component built on top of PrimeReact's Input Text Component. 
 */

const InputText = (props: Props) => {
    const [value, setValue] = useState(props.value || ""); // initialize value
    
    useEffect(() => {
      setValue(props.value); // update value when props.value changes
    }, [props.value]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        if (props.setProps) {
            props.setProps({ value: newValue });
        }
    };
    
    return (
        <div className={`flex flex-column gap-2`}>
            <label htmlFor={props.id}>{props.label}</label>
            <div>
                <span className={`p-input-icon-${props.iconPosition}`}>
                    {props.icon}
                    <PrimeReactInputText
                        id={props.id}
                        value={value} 
                        placeholder={props.placeholder} 
                        onChange={handleChange}
                        keyfilter={props.keyfilter}
                        tooltip={props.tooltip}
                        tooltipOptions={props.tooltip_options}
                        className={props.className}
                        aria-describedby={`help-${props.id}`}
                        {...props}
                    />
                </span>
            </div>
            <small id={`help-${props.id}`}>{props.help_text}</small>
        </div>
    ); 
}

InputText.propTypes = {
    setProps: PropTypes.func, 
    id: PropTypes.string, 
    value: PropTypes.string, 
    placeholder: PropTypes.string, 
    keyfilter: PropTypes.string, 
    tooltip: PropTypes.string, 
    icon: PropTypes.object, 
    iconPosition: PropTypes.oneOf(["left", "right"]), 
    className: PropTypes.string, 
    label: PropTypes.string, 
    help_text: PropTypes.string
}

export default InputText;
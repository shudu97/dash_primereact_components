import React, { useState, useEffect } from "react";
import { InputNumber as PrimeReactInputNumber, InputNumberPassThroughOptions } from "primereact/inputnumber"

type Props = {
    /** Function to Set Props */
    setProps: Function,
    /** ID of the input Element */
    id?: string; 
    /** Initial Value */
    value?: number; 
    /** Whether to use a thousands separator */
    use_grouping?: boolean; 
    /** Minimum number of digits after the decimal point */
    min_fraction_digits?: number; 
    /** Maximum number of digits after the decimal point */
    max_fraction_digits?: number;  
    /** Minimum allowable value */
    min_value?: number; 
    /** Maximum allowable value */
    max_value?: number; 
    /** Currency Code */
    currency?: string;  
    /** Whether to display the currency code instead of currency symbol */
    currency_code_display?: boolean; 
    /** Locale for formatting */
    locale?: string;  
    /** Text to display before the value */
    prefix?: string; 
    /** Text to display after the value */
    suffix?: string; 
    /** Whether to show the increment/decrement buttons */
    show_buttons?: boolean; 
    /** Layout of increment/decrement buttons, can be horizontal, vertical or stacked */
    button_layout?; 
    /** Icon for the increment button */
    increment_button_icon?: string;
    /** ClassName for the increment button */ 
    increment_button_className?: string; 
    /** Icon for the decrement button */
    decrement_button_icon?: string; 
    /** ClassName for the decrement button */
    decrement_button_className?: string; 
    /** Label of for the input field */
    label?: string; 
    /** Whether to make the label floating */
    floating_label?: boolean; 
    /** Indicates if the input is in a valid state */
    valid?: boolean;
    /** Whether the input is disabled or not */ 
    disabled?: boolean; 
    /** Pass Through Options to components inside */
    pt?: InputNumberPassThroughOptions
}

/**
 * InputNumber is a custom Dash Component 
 * built on top of PrimeReact's InputNumber Component. 
*/


const InputNumber = (props: Props) => {
    const {
        setProps,
        id,  
        value, 
        use_grouping, 
        min_fraction_digits,     
        max_fraction_digits, 
        min_value, 
        max_value, 
        currency, 
        currency_code_display, 
        locale, 
        prefix, 
        suffix, 
        show_buttons, 
        button_layout, 
        increment_button_icon, 
        increment_button_className, 
        decrement_button_icon, 
        decrement_button_className, 
        label, 
        floating_label, 
        valid, 
        disabled, 
        pt, 
        ...other
    } = props; 

    const [val, setValue] = useState(value); // initialize value
    
    useEffect(() => {
      setValue(value); // update value when props.value changes
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
                    <PrimeReactInputNumber
                        id={id}
                        value={val}
                        onValueChange={handleChange}
                        useGrouping={use_grouping}
                        minFractionDigits={min_fraction_digits}
                        maxFractionDigits={max_fraction_digits}
                        min={min_value}
                        max={max_value}
                        mode={currency ? 'currency' : 'decimal'}
                        currency={currency ? currency : undefined}
                        currencyDisplay={currency_code_display === true ? "code" : undefined}
                        locale={locale}
                        prefix={prefix}
                        suffix={suffix}
                        showButtons={show_buttons}
                        buttonLayout={button_layout}
                        incrementButtonIcon={increment_button_icon}
                        incrementButtonClassName={increment_button_className}
                        decrementButtonIcon={decrement_button_icon}
                        decrementButtonClassName={decrement_button_className}
                        disabled={disabled}
                        className={`${valid === false ? 'p-invalid' : ''}`}
                        pt={pt}
                        {...other}
                    />            
                    {label && floating_label === true ? <label htmlFor={id}>{label}</label> : null}
                </span>
            </div>
        </div>
    )
    
}

InputNumber.defaultProps = {
    use_grouping: true, 
    button_layout: 'stacked', 
    floating_label: false, 
    valid: true
}

export default InputNumber
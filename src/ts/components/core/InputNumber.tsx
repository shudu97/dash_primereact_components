import React, { useState, useEffect } from "react";
import { InputNumber as PrimeReactInputNumber } from "primereact/inputnumber"

type Props = {
    setProps: Function,
    id?: string; 
    value?: number; 
    use_grouping?: boolean; 
    min_fraction_digits?: number; 
    max_fraction_digits?: number;  
    min_value?: number; 
    max_value?: number; 
    currency?: string;  
    currency_code_display?: boolean; 
    locale?: string;  
    prefix?: string; 
    suffix?: string; 
    show_buttons?: boolean; 
    button_layout?; 
    increment_button_icon?: string; 
    increment_button_className?: string; 
    decrement_button_icon?: string; 
    decrement_button_className?: string; 
}

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
            {...other}
        />
    )
    
}

InputNumber.defaultProps = {
    use_grouping: true, 
    button_layout: 'stacked'
}

export default InputNumber
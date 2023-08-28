import React, { useState, useEffect } from "react";
import { InputNumber as PrimeReactInputNumber } from "primereact/inputnumber"

type Props = {
    setProps: Function,
    id?: string,  
    value?: number, 
    use_grouping?: boolean, 
    min_fraction_digits?: number,
    max_fraction_digits?: number,  
    min_value?: number, 
    max_value?: number, 
    currency?: string, 
    currency_code_display?: boolean, 
    locale?: string, 
    prefix?: string, 
    suffix?: string
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
            {...other}
        />
    )
    
}

InputNumber.defaultProps = {
    use_grouping: true
}

export default InputNumber
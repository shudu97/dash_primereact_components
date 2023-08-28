import React, { useState, useEffect } from "react";
import { InputNumber as PrimeReactInputNumber } from "primereact/inputnumber"
import { type } from "ramda";

type Props = {
    setProps: Function,
    id?: string,  
    value?: number, 
    use_grouping?: boolean, 
    min_fraction_digits?: number,
    max_fraction_digits?: number,  
    min_value?: number, 
    max_value?: number
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
        />
    )
    
}

InputNumber.defaultProps = {
    use_grouping: true
}

export default InputNumber
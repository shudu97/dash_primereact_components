import React, { useState, useEffect } from "react";
import { Knob as PrimeReactKnob } from 'primereact/knob'

type Props = {
    /** Function to set the props in Dash */
    setProps: Function;
    /** Optional ID for the component */
    id?: string;
    /** Value of the knob */
    value?: number;
    /** Template for displaying the value */
    value_template?: string;
    /** Minimum value for the knob */
    min?: number;
    /** Maximum value for the knob */
    max?: number;
    /** Step value for the knob */
    step?: number;
    /** Width of the stroke for the knob indicator */
    stroke_width?: number;
    /** Size of the knob component */
    size?: number;
    /** Color of the knob value indicator */
    value_color?: string;
    /** Color of the knob range */
    range_color?: string;
    /** Boolean to make the knob read-only */
    read_only?: boolean;
    /** Boolean to disable the knob */
    disabled?: boolean;
}

/**
 * Knob is a custom Dash Component 
 * built on top of PrimeReact's Knob component. 
 */

const Knob = (props: Props) => {
    const {
        setProps, 
        id, 
        value, 
        value_template, 
        min, 
        max, 
        step, 
        stroke_width, 
        size, 
        value_color, 
        range_color, 
        read_only, 
        disabled
    } = props

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
        <PrimeReactKnob
            id={id}
            value={val}
            valueTemplate={value_template}
            onChange={handleChange}
            min={min}
            max={max}
            step={step}
            strokeWidth={stroke_width}
            size={size}
            valueColor={value_color}
            rangeColor={range_color}
            readOnly={read_only}
            disabled={disabled}
        />
    )
}

Knob.defaultProps = {
    min: 0,
    max: 100, 
    value_template: '{value}', 
    step: 1, 
    stroke_width: 14, 
    size: 100, 
    value_color: 'var(--primary-color, Black)', 
    range_color: 'var(--surface-border, LightGray)', 
    read_only: false, 
    disable: false
}

export default Knob
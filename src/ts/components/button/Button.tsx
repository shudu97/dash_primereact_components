import React, { useState, useEffect } from 'react'
import { Button as PrimeReactButton, ButtonProps } from 'primereact/button'
import { IconType } from 'primereact/utils'

type Props = {
    setProps: Function; 
    id?: string; 
    n_clicks?: number; 
    label?: string; 
    link?: boolean; 
    icon?: IconType<ButtonProps>; 
    icon_pos?; 
    enable_loading?: boolean; 
    loading?: boolean
}

const Button = (props: Props) => {
    const {
        setProps, 
        id, 
        n_clicks, 
        label, 
        link, 
        icon, 
        icon_pos, 
        enable_loading, 
        loading
    } = props; 

    const [clicks, setClicks] = useState(n_clicks); 
    const [internalloading, setInternalLoading] = useState(loading)

    useEffect(() => {
        setClicks(n_clicks); 
    }, [n_clicks]); 

    useEffect(() => {
        setInternalLoading(loading);
    }, [loading]);

    const click = () => {
        const newClicks = clicks + 1; 
        setClicks(newClicks); 
        setProps({ n_clicks: newClicks }); 

        if (enable_loading) {
            setInternalLoading(true)
        }
    }

    return (
        <PrimeReactButton 
            id={id}
            onClick={click}
            label={label}
            link={link}
            icon={icon}
            iconPos={icon_pos}
            loading={internalloading}
        />
    )    
}

Button.defaultProps = {
    n_clicks: 0, 
    enable_loading: false
}

export default Button
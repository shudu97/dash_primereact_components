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
}

const Button = (props: Props) => {
    const {
        setProps, 
        id, 
        n_clicks, 
        label, 
        link, 
        icon, 
        icon_pos
    } = props; 

    const [clicks, setClicks] = useState(n_clicks); 

    useEffect(() => {
        setClicks(n_clicks); 
    }, [n_clicks]); 

    const click = () => {
        const newClicks = clicks + 1; 
        setClicks(newClicks); 
        setProps({ n_clicks: newClicks }); 
    }

 
    return (
        <PrimeReactButton 
            id={id}
            onClick={click}
            label={label}
            link={link}
            icon={icon}
            iconPos={icon_pos}
        />
    )    
}

Button.defaultProps = {
    n_clicks: 0
}

export default Button
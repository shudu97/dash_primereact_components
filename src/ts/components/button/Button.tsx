import React, { useState, useEffect } from 'react'
import { Button as PrimeReactButton, ButtonProps, ButtonPassThroughOptions } from 'primereact/button'
import { IconType } from 'primereact/utils'
import { TooltipOptions } from 'primereact/tooltip/tooltipoptions'

type Props = {
    setProps: Function; 
    id?: string; 
    n_clicks?: number; 
    label?: string; 
    link?: boolean; 
    icon?: IconType<ButtonProps>; 
    icon_pos?; 
    enable_loading?: boolean; 
    loading?: boolean; 
    loading_icon?: IconType<ButtonProps>; 
    severity?; 
    disabled?: boolean; 
    raised?: boolean; 
    rounded?: boolean; 
    text?: boolean; 
    outlined?: boolean;
    badge?: string; 
    badge_className?: string; 
    size?; 
    tooltip?: string; 
    tooltip_options?: TooltipOptions; 
    pt?: ButtonPassThroughOptions
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
        loading, 
        loading_icon, 
        severity, 
        disabled, 
        raised, 
        rounded, 
        text, 
        outlined, 
        badge, 
        badge_className, 
        size, 
        tooltip, 
        tooltip_options, 
        pt, 
        ...other
    } = props; 

    const [clicks, setClicks] = useState(n_clicks); 
    const [internalloading, setInternalLoading] = useState(loading)
    const [internalbadge, setBadge] = useState(badge)

    useEffect(() => {
        setClicks(n_clicks); 
    }, [n_clicks]); 

    useEffect(() => {
        setInternalLoading(loading);
    }, [loading]);

    useEffect(() => {
        setBadge(badge); 
    }, [badge])

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
            loadingIcon={loading_icon}
            severity={severity}
            disabled={disabled}
            raised={raised}
            rounded={rounded}
            text={text}
            outlined={outlined}
            badge={internalbadge}
            badgeClassName={badge_className}
            size={size}
            tooltip={tooltip}
            tooltipOptions={tooltip_options}
            pt={pt}
            {...other}
        />
    )    
}

Button.defaultProps = {
    n_clicks: 0, 
    enable_loading: false
}

export default Button
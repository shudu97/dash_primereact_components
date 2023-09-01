import React, { useState, useEffect } from 'react'
import { Button as PrimeReactButton, ButtonProps, ButtonPassThroughOptions } from 'primereact/button'
import { IconType } from 'primereact/utils'
import { TooltipOptions } from 'primereact/tooltip/tooltipoptions'

type Props = {
    /** A function to update the component's properties from the Dash callback */
    setProps: Function;

    /** The unique identifier for the button */
    id?: string;

    /** The number of times the button has been clicked */
    n_clicks?: number;

    /** The label displayed on the button */
    label?: string;

    /** A flag indicating whether the button should behave like a hyperlink */
    link?: boolean;

    /** An icon to be displayed on the button */
    icon?: IconType<ButtonProps>;

    /** Position of the icon in the button ('left' or 'right') */
    icon_pos?;

    /** Flag to enable the loading state when clicked */
    enable_loading?: boolean;

    /** Indicates whether the button is currently in the loading state */
    loading?: boolean;

    /** An icon to be displayed when the button is in the loading state */
    loading_icon?: IconType<ButtonProps>;

    /** Severity level for the button, usually for styling (e.g., 'info', 'error') */
    severity?;

    /** Flag indicating whether the button is disabled */
    disabled?: boolean;

    /** Flag to apply a 'raised' visual effect to the button */
    raised?: boolean;

    /** Flag to apply a 'rounded' visual effect to the button */
    rounded?: boolean;

    /** Flag to indicate the button should be displayed as text */
    text?: boolean;

    /** Flag to indicate the button should have an outlined style */
    outlined?: boolean;

    /** Badge to be displayed on the button */
    badge?: string;

    /** Class name to apply for the badge */
    badge_className?: string;

    /** Size of the button ('small', 'medium', 'large') */
    size?;

    /** Tooltip to be displayed when hovered */
    tooltip?: string;

    /** Tooltip options for customization */
    tooltip_options?: TooltipOptions;

    /** Any additional attributes to be passed to the underlying component */
    pt?: ButtonPassThroughOptions;
}

/**
 * Button is a custom Dash Component
 * built on top to PrimeReact's Button Component
 */

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
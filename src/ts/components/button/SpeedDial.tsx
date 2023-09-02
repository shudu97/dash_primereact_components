import React, { CSSProperties, ReactNode } from "react";
import { SpeedDial as PrimeReactSpeedDial, SpeedDialProps, SpeedDialPassThroughOptions } from 'primereact/speeddial'
import { MenuItem as OriginalMenuItem} from "primereact/menuitem";
import { IconType } from "primereact/utils";

/** Extends OriginalMenuItem to include custom properties */
interface MenuItem extends OriginalMenuItem {
    /** Counter for the number of clicks */
    n_clicks?: number;
    /** Optional href for redirection */
    href?: string;
}

type Props = {
    /** Function to set the props in Dash */
    setProps: Function; 
    /** Optional ID for the component */
    id?: string; 
    /** Array of MenuItem objects for the speed dial */
    items: MenuItem[]; 
    /** Optional direction for dial opening */
    direction?; 
    /** Optional type for the speed dial */
    type?; 
    /** Boolean to control display of a mask when dial is open */
    mask?: boolean; 
    /** Icon displayed when the speed dial actions are not visible */
    show_icon?: IconType<SpeedDialProps>;
    /** Icon displayed when the speed dial actions are visible */
    hide_icon?: IconType<SpeedDialProps>;
    /** Transition delay for dial opening */
    transition_delay?: number;
    /** Boolean to control the enabled state of the dial */
    disabled?: boolean;
    /** Boolean to control if dial hides on click outside */
    hide_on_click_outside?: boolean;
    /** Boolean to control rotation animation of the main button */
    rotate_animation?: boolean;
    /** Optional ReactNode children */
    children?: ReactNode;
    /** Inline style of the button element */
    button_style?: CSSProperties; 
    /** Style class of the button element */
    button_className?: string; 
    /** Inline Style of the mask element */
    mask_style?: CSSProperties
    /** Style class of the mask element */
    mask_className?: string; 
    /** Pass-through options for the underlying PrimeReact component */
    pt?: SpeedDialPassThroughOptions; 
}

/**
 * SpeedDial is a custom Dash Component
 * built on top of PrimeReact's SpeedDial Component. 
 */

const SpeedDial = (props: Props) => {
    const {
        setProps, 
        id,
        items, 
        direction, 
        type, 
        mask, 
        show_icon, 
        hide_icon, 
        transition_delay, 
        disabled, 
        hide_on_click_outside, 
        rotate_animation, 
        children, 
        button_style, 
        button_className, 
        mask_style, 
        mask_className, 
        pt, 
        ...other
    } = props; 

    const handleClick = (itemId: string, href?: string) => {
        const updatedItems = items.map(item => {
            const currentClicks = (item.id === itemId) ? (item.n_clicks || 0) + 1 : 0;
            return {...item, n_clicks: currentClicks };
        });
    
        setProps({ items: updatedItems, last_clicked: itemId })

        if (href) {
            window.location.href = href; 
        }
    }

    const itemsWithCommands = items.map(item => ({
        ...item,
        command: () => handleClick(item.id || '', item.href)
    }));

    return (
        <PrimeReactSpeedDial
            id={id}
            model={itemsWithCommands}
            direction={direction}
            type={type}
            mask={mask}
            showIcon={show_icon}
            hideIcon={hide_icon}
            transitionDelay={transition_delay}
            disabled={disabled}
            hideOnClickOutside={hide_on_click_outside}
            rotateAnimation={rotate_animation}
            children={children}
            buttonStyle={button_style}
            buttonClassName={button_className}
            maskStyle={mask_style}
            maskClassName={mask_className}
            pt={pt}
            {...other}
        />
    )

}

export default SpeedDial


import React, { useEffect, useCallback, useState } from "react";
import { Carousel as PrimeReactCarousel, CarouselProps, CarouselPassThroughOptions } from 'primereact/carousel'
import { IconType } from "primereact/utils";

type Props = {
    /** Function to update component state */
    setProps: Function; 
    /** HTML id attribute for the input element */
    id?: string; 
    /** An array of objects to display */
    value?: any[]; 
    /** Number of items per page */
    numVisible?: number; 
    /** Number of items to scroll */
    numScroll?: number; 
    /** An array of options for responsive design */
    responsiveOptions?: any[]; 
    /** Defines if scrolling would be infinite */
    circular?: boolean; 
    /** Time in milliseconds to scroll items automatically */
    autoplayInterval?: number; 
    /** Label of footer */
    footer?, 
    /** Label of Header */
    header?, 
    /** Specifies the layout of the component, valid values are "horizontal" and "vertical" */
    orientation?, 
    /** Icon for previous button by orientation */
    prevIcon?: IconType<CarouselProps>, 
    /** Icon for next button by orientation */
    nextIcon?: IconType<CarouselProps>, 
    /** Whether to display indicator container */
    showIndicators: boolean,  
    /** Whether to display navigation buttons in container */
    showNavigators: boolean, 
    /** Pass Through Options to component inside */
    pt?: CarouselPassThroughOptions
}

/**
 * TickerCarousel is a custom Dash Component
 * built on top of PrimeReact's Carousel Component with specific format
 */

const Carousel = (props: Props) => {
    const {
        setProps, 
        id, 
        value, 
        numVisible, 
        numScroll, 
        responsiveOptions, 
        circular, 
        autoplayInterval, 
        orientation, 
        prevIcon, 
        nextIcon, 
        showIndicators, 
        showNavigators, 
        pt, 
        ...other
    } = props;

    // State to trigger a re-render
    const [, forceUpdate] = useState(0);

    // Function to trigger a re-render
    const forceRender = useCallback(() => {
        forceUpdate(n => n + 1);
    }, []);

    const [carouselValue, setCarouselValue] = useState<any[]>(value || []);

    useEffect(() => {
        // Whenever the value prop changes, update the local state and the Dash backend.
        setCarouselValue(value);
        forceRender(); 
        if (setProps) {
          // Update the Dash component's props with the new value.
          setProps({ value: value });
        }
      }, [value, forceRender, setProps]); // Include setProps in the dependency array to adhere to the exhaustive-deps rule.
      
    const itemTemplate = (item) => {
        return (
            <div style={{ display: 'inline-flex' }}>
                <p
                    style={{ fontWeight: 500, fontSize: item.size, marginRight: '0.5rem'}}
                >{item.name}</p>
                <p
                    style={{ fontSize: item.size, marginRight: '0.5rem'}}
                >{item.value}</p>
                <p
                    style={{ fontSize: item.size, color: item.color, marginRight: '0.25rem'}}
                >{item.symbol}</p>
                <p
                    style={{ fontSize: item.size, color: item.color, marginRight: '0.25rem'}}
                >{item.change_value}</p>
            </div>
        )
    }

    return (
        <PrimeReactCarousel
            id={id}
            value={carouselValue}
            numVisible={numVisible}
            numScroll={numScroll}
            itemTemplate={itemTemplate}
            responsiveOptions={responsiveOptions}
            circular={circular}
            autoplayInterval={autoplayInterval}
            orientation={orientation}
            prevIcon={prevIcon}
            nextIcon={nextIcon}
            showIndicators={showIndicators}
            showNavigators={showNavigators}
            pt={pt}
            {...other}
        />
    ); 
}

Carousel.defaultProps = {
    numVisible: 5, 
    numScroll: 5, 
    circular: true, 
    autoplayInterval: null, 
    orientation: 'horizontal', 
    showIndicators: true, 
    showNavigators: true
}

export default Carousel; 
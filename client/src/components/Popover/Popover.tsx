/**
 * @fileoverview Popover component implementation
 *
 * This file contains implementation of a Popover. This is
 * a floating component that will be generated in different root element.
 * Primary use of this component in application is a tooltip
 *
 * @module Popover
 * 
 * @author xturyt00
 */

import React, { useState, cloneElement, useRef, useMemo } from "react"
import { floatingRoot } from "../../context/AppContextProvider"
import { placements } from "../../utils/common"

import {
    FloatingPortal,
    useInteractions,
    useHover,
    useFloating,
    arrow,
    flip,
    shift,
    autoUpdate,
    offset,
    useDismiss,
    ReferenceType,
} from "@floating-ui/react-dom-interactions"

import classNames from "classnames"
import classes from './Popover.module.css'

/** Component props type */
type PropsType = {
    children: React.ReactNode
    element: React.ReactElement<{ ref: (node: ReferenceType | null) => void; }>
    className?: string
    placement?: placements
    active?: boolean
    padding?: boolean
    mouseOnly?: boolean
    fallbackPlacements?: placements[]
    offset?: number
}

/**
 * Popover component, creates popover at different pages
 * 
 * @see https://floating-ui.com/ floating ui documentation
 * 
 * @param props component props
 * @returns Popover component
 * 
 * ```tsx
 * // ...
 * 
 * return (
 *  <div>
 *      <Popover element = {<p>Element with hover</p>}>
 *          Hover content here
 *      <Popover/>
 *  </div>
 * )
 * ```
 */
const Popover = ({
    children,
    element: Element,
    className = "",
    placement = placements.TOP,
    active = true,
    padding = false,
    mouseOnly = false,
    fallbackPlacements = [],
    offset: defaultOffset = 10
}: PropsType) => {

    const [isActive, setIsActive] = useState<boolean>(false)
    const arrowRef = useRef<HTMLDivElement>(null)

    const {
        x, // x position of the floating element
        y, // y position of the floating element
        reference, // reference of the element with popover
        floating, // popover reference
        strategy, // position type (relative | absolute)
        context, // context
        placement: floatingPlacement,  // actual placement
        middlewareData,
    } = useFloating({
        placement, // placement of the popover relatively to its parent
        open: isActive, // popover state
        onOpenChange: setIsActive,
        middleware: [
            // flip placements
            flip({ fallbackPlacements }),
            // shift placements
            shift(),
            // arrow set up
            arrow({ element: arrowRef }),
            // offset set up
            offset(defaultOffset),
        ],
        // auto update for scrolling and resizing
        whileElementsMounted: (reference, floating, update) =>
            autoUpdate(reference, floating, update, { elementResize: true, ancestorScroll: true }),
    })

    // Hover set up for the floating element
    const { getReferenceProps, getFloatingProps } = useInteractions([
        useHover(context, { enabled: active, mouseOnly }),
        useDismiss(context, { ancestorScroll: true }),
    ])

    // Calculates arrow style
    const arrowStyles = useMemo(
        () => classNames({
            [classes.popoverArrowTop]: floatingPlacement.split("-")[0] === placements.BOTTOM,
            [classes.popoverArrowRight]: floatingPlacement.split("-")[0] === placements.LEFT,
            [classes.popoverArrowBottom]: floatingPlacement.split("-")[0] === placements.TOP,
            [classes.popoverArrowLeft]: floatingPlacement.split("-")[0] === placements.RIGHT,
        }),
        [floatingPlacement]
    )

    // Calculates popover styles
    const popoverStyles = useMemo(
        () => classNames([classes.popover], className, { [classes.popoverPadding]: padding }),
        [padding, className]
    )

    return (
        <>
            {cloneElement(Element, { ref: reference, ...getReferenceProps() })}
            <FloatingPortal root={floatingRoot}>
                {isActive && (
                    <div
                        className={popoverStyles}
                        ref={floating}
                        style={{
                            position: strategy,
                            top: y ?? 0,
                            left: x ?? 0,
                        }}
                        {...getFloatingProps()}>
                        <div
                            className={arrowStyles}
                            ref={arrowRef}
                            style={{
                                position: "absolute",
                                left: `${middlewareData?.arrow?.x}px`,
                                top: `${middlewareData?.arrow?.y}px`,
                            }}
                        />
                        {children}
                    </div>
                )}
            </FloatingPortal>
        </>
    )
}

export default Popover
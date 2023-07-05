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

import React, { useState, cloneElement, useRef, useMemo, useEffect, ReactElement, JSXElementConstructor } from "react"
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
    Boundary,
    size,
    hide,
    useClick,
} from "@floating-ui/react-dom-interactions"

import classNames from "classnames"
import classes from './DismissWindow.module.css'

/** Component props type */
type PropsType = {
    children: (setIsActive: React.Dispatch<React.SetStateAction<boolean>>) => React.ReactNode
    element: (isActive: boolean) => ReactElement<any, string | JSXElementConstructor<any>>
    className?: string
    placement?: placements
    offset?: number
    align?: boolean
    enableArrows?: boolean
    dismissOnClick?: boolean
    boundary?: string | null
    disabled?: boolean
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
const DismissWindow = ({
    children,
    element: Element,
    className = "",
    placement = placements.TOP,
    align = false,
    enableArrows = false,
    dismissOnClick = false,
    boundary = null,
    offset: defaultOffset = 10,
    disabled = false
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
            flip({ 
                boundary: boundary === null ? document.body as Boundary : document.querySelector(boundary) as Boundary,
                fallbackPlacements: ["top"],
             }),
            // shift placements
            shift(),
            // arrow set up
            arrow({ element: arrowRef }),
            size({
                apply({ rects, elements }) {
                    if (align) {
                        elements.floating.style.width = rects.reference.width + "px"
                    }
                },
            }),
            hide(),
            // offset set up
            offset(defaultOffset),
        ],
        // auto update for scrolling and resizing
        whileElementsMounted: (reference, floating, update) =>
            autoUpdate(reference, floating, update, { elementResize: true, ancestorScroll: true }),
    })

    // Hover set up for the floating element
    const { getReferenceProps, getFloatingProps } = useInteractions([
        useClick(context, { enabled: !disabled }),
        useDismiss(context),
    ])

    // Closes dropdown on scroll when it's hidden for the user.
    useEffect(() => {
        if (middlewareData?.hide?.referenceHidden) {
            setIsActive(false)
        }
    }, [])

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

    return (
        <>
            {cloneElement(Element(isActive), { ref: reference, ...getReferenceProps() })}
            <FloatingPortal root={floatingRoot}>
                {isActive && cloneElement(
                    children(setIsActive) as ReactElement<any, string | JSXElementConstructor<any>>,
                    {
                        ref: floating,
                        style: {
                            position: strategy,
                            top: y ?? 0,
                            left: x ?? 0,
                        },
                        ...getFloatingProps(),
                        ...(dismissOnClick ? getReferenceProps() : {}),
                    },
                    <>
                        {enableArrows && (
                            <div
                                className={arrowStyles}
                                ref={arrowRef}
                                style={{
                                    position: "absolute",
                                    left: `${middlewareData?.arrow?.x}px`,
                                    top: `${middlewareData?.arrow?.y}px`,
                                    borderTopColor: "inherit",
                                    borderBottomColor: "inherit",
                                }}
                            ></div>
                        )}
                        {(children(setIsActive) as ReactElement<any, string | JSXElementConstructor<any>>).props.children}
                    </>
                )}
            </FloatingPortal>
        </>
    )
}

export default DismissWindow
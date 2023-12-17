/**
 * @fileoverview Button component implementation
 *
 * This file contains implementation of a Button component. This is a
 * common component for the button in the application.
 *
 * @module Button
 * 
 * @author xturyt00
 */
import React, { MouseEventHandler, forwardRef, useContext } from 'react'
import { AppContext } from '../../context/AppContextProvider'
import classNames from 'classnames'
import classes from "./Button.module.css"

type PropsType = {
    className?: string
    isTransparent?: boolean
    isBlue?: boolean
    isRed?: boolean
    disabled?: boolean
    children?: React.ReactNode
    onClick?: MouseEventHandler<HTMLButtonElement>
}

/**
 * Button component
 * 
 * @param props - Component props
 * @param props.className - ClassName
 * @param props.isBlue - Flag if true then the button is blue
 * @param props.isTransparent - Flag if true then the button is transparent
 * @param props.disabled - flag if true then the button is disabled
 * @param props.onClick - Callback to click the button
 * @returns Button component
 */
const Button = forwardRef<HTMLButtonElement, PropsType>(({
    className = "",
    isBlue = false,
    isRed = false,
    isTransparent = false,
    children = null,
    disabled = false,
    onClick = (e) => { }
}, ref) => {

    const { isDark } = useContext(AppContext)

    const buttonStyles = classNames(classes.container, className, {
        [classes.blue]: isBlue,
        [classes.red]: isRed,
        [classes.dark]: isDark,
        [classes.transparent]: isTransparent,
    })

    return (
        <button
            ref={ref}
            className={buttonStyles}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
})

export default Button

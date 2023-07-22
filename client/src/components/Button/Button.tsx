import React, { MouseEventHandler, useContext, useMemo } from 'react'
import classes from "./Button.module.css"
import classNames from 'classnames'
import { AppContext } from '../../context/AppContextProvider'

type PropsType = {
    className?: string
    isTransparent?: boolean
    isBlue?: boolean
    disabled?: boolean
    children?: React.ReactNode
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button = ({
    className = "",
    isBlue = false,
    isTransparent = false,
    children,
    disabled = false,
    onClick = (e) => { }
}: PropsType) => {

    const { isDark } = useContext(AppContext)

    const buttonStyles = useMemo(
        () => classNames(classes.container, className,
            {
                [classes.blue]: isBlue,
                [classes.dark]: isDark,
                [classes.transparent]: isTransparent,
            }),
        [isBlue, isDark, isTransparent]
    )

    return (
        <button
            className={buttonStyles}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button

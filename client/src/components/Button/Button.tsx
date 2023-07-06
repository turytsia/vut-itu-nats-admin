import React, { MouseEventHandler, useContext, useMemo } from 'react'
import classes from "./Button.module.css"
import classNames from 'classnames'
import { AppContext } from '../../context/AppContextProvider'

type PropsType = {
    isBlue?: boolean
    disabled?: boolean
    children?: React.ReactNode
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button = ({
    isBlue,
    children,
    disabled = false,
    onClick = (e) => {}
}: PropsType) => {

    const { isDark } = useContext(AppContext)

    const buttonStyles = useMemo(
        () => classNames(classes.container, { [classes.blue]: isBlue, [classes.dark]: isDark }),
        [isBlue, isDark]
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
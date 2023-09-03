import React from 'react'

import classes from "./Text.module.css"
import classNames from 'classnames'

type PropsType = {
    labelText: string,
    children: React.ReactNode
    className?: string
}

const Text = ({
    labelText,
    children,
    className
}: PropsType) => {

    const valueStyles = classNames(classes.value, className)

    return (
        <div className={classes.container}>
            <p className={classes.label}>{labelText}</p>
            <div className={valueStyles}>{children}</div>
        </div>
    )
}

export default Text

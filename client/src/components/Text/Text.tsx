/**
 * @fileoverview Text component implments a key value overview for Details.tsx
 *
 * @module Text
 *
 * @author xturyt00
 */
import React from 'react'

import classes from "./Text.module.css"
import classNames from 'classnames'

type PropsType = {
    labelText: string,
    children: React.ReactNode
    className?: string
}

/**
 * Text component
 * 
 * @param props - Component props 
 * @param props.labelText - Label text
 * @param props.children - Children
 * @param props.className - Classname
 * @returns Text
 */
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

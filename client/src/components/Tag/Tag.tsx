/**
 * @fileoverview Tag component implementation
 *
 * This file contains implementation of a Tag component. This is a
 * common component for the tag in the application.
 *
 * @module Tag
 * 
 * @author xturyt00
 */
import React from 'react'

import classes from "./Tag.module.css"
import classNames from 'classnames'

type PropsType = {
    children: React.ReactNode
    isBlue?: boolean
    renderRight?: React.ReactNode
    onClick?: () => void
}

/**
 * Tag component
 * 
 * @param props - Component props
 * @param props.isBlue - Set blue styles for the tag (Default = false)
 * @param props.children - Children
 * @param props.onClick - Callback to click a tag 
 * @returns Tag component
 */
const Tag = ({
    isBlue,
    children,
    renderRight = null,
    onClick = () => { }
}: PropsType) => {

    const containerStyles = classNames(classes.container, { [classes.blue]: isBlue })

    return <p className={containerStyles} onClick={onClick}>{children} {renderRight}</p>
}

export default Tag
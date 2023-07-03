import React, { useState } from 'react'

import classes from "./Cell.module.css"
import classNames from 'classnames'

type PropsType = {
    children: React.ReactNode
    isHover: boolean
    onMouseEnter: () => void
}

const Cell = ({
    children,
    isHover,
    onMouseEnter,
}: PropsType) => {

    const containerStyles = classNames(classes.container, { [classes.hover]: isHover })

    return (
        <div className={containerStyles} onMouseEnter={onMouseEnter}>{children}</div>
    )
}

export default Cell
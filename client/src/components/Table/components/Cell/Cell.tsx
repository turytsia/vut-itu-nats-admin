import React, { useState } from 'react'

import classes from "./Cell.module.css"
import classNames from 'classnames'

type PropsType = {
    children: React.ReactNode
    isHover: boolean
}

const Cell = ({
    children,
    isHover,
}: PropsType) => {

    const containerStyles = classNames(classes.container, { [classes.hover]: isHover })

    return (
        <div className={containerStyles}>{children}</div>
    )
}

export default Cell
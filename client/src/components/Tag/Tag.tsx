import React from 'react'

import classes from "./Tag.module.css"
import classNames from 'classnames'

type PropsType = {
    children: React.ReactNode
    isBlue?: boolean
    renderRight?: React.ReactNode
    onClick?: () => void
}

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
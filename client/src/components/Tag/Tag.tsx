import React from 'react'

import classes from "./Tag.module.css"

type PropsType = {
    children: React.ReactNode
}

const Tag = ({
    children
}: PropsType) => {
    return <p className={classes.container}>{children}</p>
}

export default Tag
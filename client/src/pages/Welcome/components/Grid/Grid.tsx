import React from 'react'
import classes from "./Grid.module.css"

type PropsType = {
    cols?: number
    children?: React.ReactNode
}

const Grid = ({
    cols = 3,
    children
}: PropsType) => {
    return (
        <div className={classes.container} style={{ gridTemplateColumns: `repeat(${cols}, minmax(300px, 1fr))` }}>{children}</div>
    )
}

export default Grid
import React from 'react'
import classes from "./Grid.module.css"
import BaseCard from '../BaseCard/BaseCard'
import uuid from 'react-uuid'

type PropsType = {
    cols?: number
    children?: React.ReactNode
    isLoading?: boolean
}

const Grid = ({
    children,
    isLoading
}: PropsType) => {
    return (
        <div className={classes.container}>
            {isLoading ? ( [...Array(8)].map(_ => <BaseCard key={uuid()} isLoading />) ): (
                children
            )}
        </div>
    )
}

export default Grid
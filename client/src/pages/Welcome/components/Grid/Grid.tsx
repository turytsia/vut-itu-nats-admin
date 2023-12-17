/**
 * @author xturyt00
 */
import React from 'react'
import classes from "./Grid.module.css"
import BaseCard from '../BaseCard/BaseCard'
import uuid from 'react-uuid'

/**
 * Grid component props
 *
 * @typedef {object} PropsType
 */
type PropsType = {
    cols?: number
    children?: React.ReactNode
    isLoading?: boolean
}


// /**
//  * BaseCard component
//  *
//  * @param props - Component props
//  * @param icon - Icon name
//  * @param name - Card name
//  * @param children - Card content
//  * @param to - Link to
//  * @param actions - Card actions
//  * @param isLoading - Loading state
//  * @constructor
//  */
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
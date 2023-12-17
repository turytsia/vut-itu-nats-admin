import React, { useContext } from 'react'
import { DataFlowType } from '../../../../utils/axios'
import classes from "./Location.module.css"
import { AppContext } from '../../../../context/AppContextProvider'
import classNames from 'classnames'

/**
 * @fileoverview Location component implementation
 *
 * This file contains implementation of Location component.
 *
 * @module Location
 *
 * @author xturyt00
 */

/**
 * Location component props
 *
 * @typedef PropsType
 */
type PropsType = {
    data: DataFlowType
    onClick: (location: DataFlowType) => void
}

/**
 *  Location component. This component renders the location
 * @param data - Dataflow object.
 * @param onClick - Function that closes the aside.
 * @constructor
 */
const Location = ({
    data,
    onClick
}: PropsType) => { 
    const { isDark } = useContext(AppContext)
    
    const containerStyles = classNames(classes.container, {
        [classes.dark]: isDark
    })
    return (
        <div className={containerStyles} onClick={() => onClick(data)}>
            {data.name}
        </div>
    )
}

export default Location
/**
 * @fileoverview View component
 *
 * This file contains View component implementation 
 *
 * @module View
 * 
 * @author xturyt00
 */

import React from 'react'

import classes from "./View.module.css"

/** component props type */
type PropsType = {
    children: React.ReactNode
} 

/**
 * Wrapper that creates view box of an application
 * 
 * @param props component props
 * @returns Wrapped children
 */
const View = ({
    children
}: PropsType) => {
    return <div className={classes.container}>{children}</div>
}

export default View
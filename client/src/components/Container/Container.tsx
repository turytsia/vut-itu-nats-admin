/**
 * @fileoverview Container component
 *
 * This file contains Container component implementation 
 *
 * @module Container
 * 
 * @author xturyt00
 */
import React, { useContext } from 'react'

import classes from "./Container.module.css"
import classNames from 'classnames'
import { AppContext } from '../../context/AppContextProvider'

/** component props type */
type PropsType = {
    children: React.ReactNode
}

/**
 * Container component, that generates main container at App.tsx
 * 
 * @param props component props
 * @returns Container
 */
const Container = ({
    children
}: PropsType) => {

    const { isDark } = useContext(AppContext)

    const containerStyles = classNames(classes.container, { [classes.dark]: isDark })

    return <div className={containerStyles}>{children}</div>
}

export default Container
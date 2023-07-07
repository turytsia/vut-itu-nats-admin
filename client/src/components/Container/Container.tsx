/**
 * @fileoverview Container component
 *
 * This file contains Container component implementation 
 *
 * @module Container
 * 
 * @author xturyt00
 */
import React, { useContext, useMemo } from 'react'

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

    const containerStyles = useMemo(
        () => classNames(classes.container, { [classes.dark]: isDark }),
        [isDark]
    )

    return <div className={containerStyles}>{children}</div>
}

export default Container
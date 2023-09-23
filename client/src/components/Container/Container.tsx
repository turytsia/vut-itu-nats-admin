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
import { AppContext } from '../../context/AppContextProvider'
import classNames from 'classnames'
import classes from "./Container.module.css"

type PropsType = {
    children: React.ReactNode
}

/**
 * Container component to generate main container at App.tsx
 * 
 * @param props - Component props
 * @param props.children - Component children
 * @returns Container component
 */
const Container = ({
    children
}: PropsType) => {

    const { isDark } = useContext(AppContext)

    const containerStyles = classNames(classes.container, { [classes.dark]: isDark })

    return <div className={containerStyles}>{children}</div>
}

export default Container

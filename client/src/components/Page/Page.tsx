/**
 * @fileoverview Page component
 *
 * This file contains Page component implementation
 *
 * @module Page
 * 
 * @author xturyt00
 */
import React, { useContext } from 'react'

import classes from "./Page.module.css"
import { AppContext } from '../../context/AppContextProvider'
import classNames from 'classnames'

/** component props type */
type PropsType = {
    children: React.ReactNode,
    title: string
}

/**
 * Page component, wraps all the pages with basic styles and title
 * 
 * @param props component props
 * @returns Page
 */
const Page = ({
    children,
    title
}: PropsType) => {

    const { isDark } = useContext(AppContext)

    const containerStyles = classNames(classes.container, { [classes.dark]: isDark })

    return (
        <section className={containerStyles}>
            <h2 className={classes.title}>{title}</h2>
            {children}
        </section>
    )
}

export default Page
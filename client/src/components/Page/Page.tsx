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

import { AppContext } from '../../context/AppContextProvider'

import classNames from 'classnames'
import classes from "./Page.module.css"

/** component props type */
type PropsType = {
    children: React.ReactNode
    title: string
    renderActions?: React.ReactNode
}

/**
 * Page component, wraps all the pages with basic styles and title
 * 
 * @param props component props
 * @returns Page
 */
const Page = ({
    children,
    title,
    renderActions
}: PropsType) => {

    const { isDark } = useContext(AppContext)

    const containerStyles = classNames(classes.container, { [classes.dark]: isDark })

    return (
        <section className={containerStyles}>
            <div className={classes.titleContainer}>
                <h2 className={classes.title}>
                    {title}
                </h2>
                {renderActions}
            </div>
            {children}
        </section>
    )
}

export default Page

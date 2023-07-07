/**
 * @fileoverview Page component
 *
 * This file contains Page component implementation
 *
 * @module Page
 * 
 * @author xturyt00
 */
import React, { useContext, useMemo } from 'react'

import classes from "./Page.module.css"
import { AppContext } from '../../context/AppContextProvider'
import classNames from 'classnames'

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

    const containerStyles = useMemo(
        () => classNames(classes.container, { [classes.dark]: isDark }),
        [isDark]
    )

    return (
        <section className={containerStyles}>
            <div className={classes.titleContainer}>
                <h2 className={classes.title}>{title}</h2>
                {renderActions}
            </div>
            {children}
        </section>
    )
}

export default Page
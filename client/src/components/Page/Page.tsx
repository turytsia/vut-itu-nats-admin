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

type PropsType = {
    children: React.ReactNode
    title: string
    renderActions?: React.ReactNode
}

/**
 * Page component, wraps all the pages with basic styles and title
 * 
 * @param props - Component props
 * @param props.title - Title
 * @param props.renderActions - Render elements to the right of a title
 * @returns Page component
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

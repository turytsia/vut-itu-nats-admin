/**
 * @fileoverview Main component
 *
 * This file contains Main component implementation
 *
 * @module Main
 * 
 * @author xturyt00
 */
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs"

import classes from "./Main.module.css"

/** component props type */
type PropsType = {
    children: React.ReactNode
}

/**
 * Main component, generates main content of the page the user is on
 * 
 * @param props component props
 * @returns Main
 */
const Main = ({
    children
}: PropsType) => {
    return (
        <main className={classes.container}>
            <Breadcrumbs />
            {children}
        </main>
    )
}

export default Main
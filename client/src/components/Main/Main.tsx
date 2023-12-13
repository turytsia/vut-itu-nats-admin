/**
 * @fileoverview Main component
 *
 * This file contains Main component implementation
 *
 * @module Main
 * 
 * @author xturyt00
 */
import { useContext } from "react"
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs"
import classes from "./Main.module.css"
import { AppContext } from "../../context/AppContextProvider"
import classNames from "classnames"

type PropsType = {
    children: React.ReactNode
}

/**
 * Main component.
 * Generate main content of the page the user is on.
 * 
 * @param props - Component props
 * @param props.childer - Children
 * @returns Main component
 */
const Main = ({
    children
}: PropsType) => {
    const { isDark } = useContext(AppContext)

    const containerStyles = classNames(classes.container, {
        [classes.dark]: isDark
    })

    return (
        <main className={containerStyles}>
            <Breadcrumbs />
            {children}
        </main>
    )
}

export default Main
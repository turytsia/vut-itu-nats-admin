/**
 * @fileoverview Menu component
 *
 * This file contains Menu component implementation
 *
 * @module Menu
 * 
 * @author xturyt00
 */

import { useContext } from 'react'
import { AppContext } from '../../context/AppContextProvider'
import Button from "./components/Button/Button"
import SectionText from "./components/SectionText/SectionText"
import icons from '../../utils/icons'

import classes from "./Menu.module.css"
import classNames from 'classnames'

/**
 *  Menu component, that generates at the left side of an App.tsx
 * 
 * @returns Menu
 */
const Menu = () => {

    const { isDark } = useContext(AppContext)

    const containerStyles = classNames(classes.container, { [classes.dark]: isDark })

    return (
        <aside className={containerStyles}>
            <Button to="/" icon={icons.danger}>Welcum</Button>
            <SectionText>Tools</SectionText>
            <Button to="/operators" textRight='53'>Operators</Button>
            <Button to="/accounts" textRight='124'>Accounts</Button>
            <Button to="/users" textRight='1.1K'>Users</Button>
            <Button to="/servers" textRight='3'>Servers</Button>
        </aside>
    )
}

export default Menu
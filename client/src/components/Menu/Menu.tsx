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
import icons from '../../utils/icons'

import classes from "./Menu.module.css"
import classNames from 'classnames'

/**
 *  Menu component, that generates at the left side of an App.tsx
 * 
 * @returns Menu component
 */
const Menu = () => {

    const { isDark } = useContext(AppContext)

    const containerStyles = classNames(classes.container, { [classes.dark]: isDark })

    return (
        <aside className={containerStyles}>
            <Button to="" icon={icons.dashboard} textRight='53'>Dashboard</Button>
            <Button to="/operators" icon={icons.operator} textRight='53'>Operators</Button>
            <Button to="/accounts" icon={icons.account} textRight='124'>Accounts</Button>
            <Button to="/users" icon={icons.users} textRight='1.1K'>Users</Button>
            <Button to="/dataflows" icon={icons.chat}>Data Flows</Button>
        </aside>
    )
}

export default Menu
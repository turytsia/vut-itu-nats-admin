/**
 * @fileoverview Menu component
 *
 * This file contains Menu component implementation
 *
 * @module Menu
 * 
 * @author xturyt00
 */

import { useContext, useMemo } from 'react'
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

    const containerStyles = useMemo(
        () => classNames(classes.container, { [classes.dark]: isDark }),
        [isDark]
    )

    return (
        <aside className={containerStyles}>
            <Button to="/" icon={icons.danger}>Welcum</Button>
            {/* TODO, use Buttons as the children of Section */}
            <SectionText>Tools</SectionText> 
            <Button to="/operators" icon={icons.control} textRight='53'>Operators</Button>
            <Button to="/accounts" icon={icons.account} textRight='124'>Accounts</Button>
            <Button to="/users" icon={icons.users} textRight='1.1K'>Users</Button>
            <Button to="/servers" textRight='3'>Servers</Button>
        </aside>
    )
}

export default Menu
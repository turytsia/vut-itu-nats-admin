/**
 * @fileoverview Header component
 *
 * This file contains Header component implementation 
 *
 * @module Header
 * 
 * @author xturyt00
 */
import { useContext } from 'react'

import { AppContext } from '../../context/AppContextProvider'
import Switch from "./components/Switch/Switch"

import classNames from 'classnames'
import classes from "./Header.module.css"
import { Icon } from '@iconify/react'
import icons from '../../utils/icons'
import { Link } from 'react-router-dom'

/**
 * Header component, that generates header bar at App.tsx
 */
const Header = () => {

    const { isDark } = useContext(AppContext)

    const containerStyles = classNames(classes.container, { [classes.dark]: isDark })
    const iconLinkStyles = classNames(classes.iconLink, { [classes.dark]: isDark })

    return (
        <header className={containerStyles}>
            <div className={classes.actions}>Jetono</div>
            <div className={classes.actions}>
                <Link className={iconLinkStyles} to="https://github.com/turytsia/nats-admin">
                    <Icon icon={icons.github} height={35} width={35} />
                </Link>
                <Switch />
            </div>
        </header>
    )
}

export default Header
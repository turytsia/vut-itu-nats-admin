/**
 * @fileoverview Header component
 *
 * This file contains Header component implementation 
 *
 * @module Header
 * 
 * @author xturyt00
 */
import { useContext, useMemo } from 'react'

import { AppContext } from '../../context/AppContextProvider'
import Switch from "./components/Switch/Switch"

import classNames from 'classnames'
import classes from "./Header.module.css"
import { Icon } from '@iconify/react'
import icons from '../../utils/icons'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'

/**
 * Header component, that generates header bar at App.tsx
 */
const Header = () => {

    const { isDark, isMenuActive, toggleMenu } = useContext(AppContext)

    const containerStyles = useMemo(
        () => classNames(classes.container, { [classes.dark]: isDark }),
        [isDark]
    )

    const iconLinkStyles = useMemo(
        () => classNames(classes.iconLink, { [classes.dark]: isDark }),
        [isDark]
    )

    return (
        <header className={containerStyles}>
            <div className={classes.actions}>
                <Button className={classes.menuBtn} onClick={toggleMenu}>
                    <Icon icon={isMenuActive ? icons.close : icons.bars} width={20} height={20} />
                </Button>
                Jetono
            </div>
            <div className={classes.actions}>
                <Link className={iconLinkStyles} target='_blank' to="https://github.com/turytsia/nats-admin">
                    <Icon icon={icons.github} height={35} width={35} />
                </Link>
                <Switch />
            </div>
        </header>
    )
}

export default Header
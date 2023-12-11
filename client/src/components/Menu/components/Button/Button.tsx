/**
 * @fileoverview Button component
 *
 * This file contains Button component implementation
 *
 * @module Button
 * 
 * @author xturyt00
 */

import classNames from 'classnames'
import React, { useCallback, useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AppContext } from '../../../../context/AppContextProvider'

import icons from '../../../../utils/icons'

import classes from "./Button.module.css"
import { Icon } from '@iconify/react'

type ClassnameType = {
  isActive: boolean
  isPending: boolean
}

/** component props type */
type PropsType = {
  children: React.ReactNode
  to: string
  icon?: icons
  textRight?: string
  pattern: RegExp
}

/**
 * Button component, that generates navigational links inside of Menu.tsx
 * 
 * @param props component props
 * @returns Button
 */
const Button = ({
  pattern,
  children,
  to,
  icon,
  textRight
}: PropsType) => {

  const {pathname} = useLocation()
  const { isDark } = useContext(AppContext)

  const linkStyles = useCallback(
    ({ isActive, isPending }: ClassnameType) => classNames(classes.container, { [classes.active]: pathname.match(pattern), [classes.dark]: isDark }),
    [isDark, pattern, pathname]
  )

  return (
    <NavLink to={to} className={linkStyles}>
      <span className={classes.innerContainer}>
        {icon && <Icon icon={icon} height={25} width={25} />}
        {children}
      </span>
      {textRight && <span className={classes.textRight}>{textRight}</span>}
    </NavLink>
  )
}

export default Button
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
import { NavLink, NavLinkProps } from 'react-router-dom'
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
}

/**
 * Button component, that generates navigational links inside of Menu.tsx
 * 
 * @param props component props
 * @returns Button
 */
const Button = ({
  children,
  to,
  icon,
  textRight
}: PropsType) => {

  const { isDark } = useContext(AppContext)

  const linkStyles = useCallback(
    ({ isActive, isPending }: ClassnameType) => classNames(classes.container, { [classes.active]: isActive, [classes.dark]: isDark }),
    [isDark]
  )

  return (
    <NavLink to={to} className={linkStyles}>
      {children}
      {icon && <Icon icon={icon} height={20} width={20}/>}
      {textRight && <span className={classes.textRight}>{textRight}</span>}
    </NavLink>
  )
}

export default Button
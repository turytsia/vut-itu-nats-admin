/**
 * @fileoverview ButtonIcon component implementation
 *
 * This file contains implementation of a Button component, that contains Icon.
 *
 * @module ButtonIcon
 * 
 * @author xturyt00
 */
import React, { forwardRef } from 'react'
import { Icon } from '@iconify/react'
import icons from '../../utils/icons'

import classes from './ButtonIcon.module.css'

type PropsType = {
    icon: icons,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

/**
 * ButtonIcon component
 * 
 * @param props - Component props
 * @param props.icon - Icon
 * @param props.onClick - Callback to click the button
 */
const ButtonIcon = forwardRef<HTMLButtonElement, PropsType>(({
    icon,
    onClick
}, ref) => (
    <button ref={ref} className={classes.container} onClick={onClick}>
        <Icon icon={icon} width={20} height={20} />
    </button>
))

export default ButtonIcon
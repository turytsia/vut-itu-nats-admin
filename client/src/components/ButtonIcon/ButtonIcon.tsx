import React, { ForwardedRef, forwardRef } from 'react'
import { Icon } from '@iconify/react'
import icons from '../../utils/icons'

import classes from './ButtonIcon.module.css'

type PropsType = {
    icon: icons,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

const ButtonIcon = forwardRef<HTMLButtonElement, PropsType>(({
    icon,
    onClick
}, ref) => (
    <button ref={ref} className={classes.container} onClick={onClick}>
        <Icon icon={icon} width={20} height={20} />
    </button>
))

export default ButtonIcon
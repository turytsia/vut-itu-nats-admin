import React from 'react'
import { Icon } from '@iconify/react'

import classes from './TextSection.module.css'

type PropsType = {
    icon: string
    text: string
    children?: React.ReactNode
}

const TextSection = ({
    icon,
    text,
    children
}: PropsType) => {
    return (
        <div className={classes.container}>
            <p className={classes.title}>
                <Icon icon={icon} width={20} height={20} />
                <span>{text}</span>
            </p>
            <div className={classes.innerContainer}>{children}</div>
        </div>
    )
}

export default TextSection
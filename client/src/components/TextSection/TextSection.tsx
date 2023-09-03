import React from 'react'
import { Icon } from '@iconify/react'

import classes from './TextSection.module.css'

type PropsType = {
    text: string
    children?: React.ReactNode
}

const TextSection = ({
    text,
    children
}: PropsType) => {
    return (
        <div className={classes.container}>
            <p className={classes.title}>
                <span>{text}</span>
            </p>
            <div className={classes.content}>{children}</div>
        </div>
    )
}

export default TextSection

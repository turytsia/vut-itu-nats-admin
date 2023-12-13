import React, { useContext } from 'react'
import { Icon } from '@iconify/react'

import classes from './TextSection.module.css'
import { AppContext } from '../../context/AppContextProvider'
import classNames from 'classnames'

type PropsType = {
    text: string
    children?: React.ReactNode
}

const TextSection = ({
    text,
    children
}: PropsType) => {

    const { isDark } = useContext(AppContext)

    const containerStyles = classNames(classes.container, {
        [classes.dark]: isDark
    })

    const titleStyles = classNames(classes.title, {
        [classes.dark]: isDark
    })

    return (
        <div className={containerStyles}>
            <p className={titleStyles}>
                <span>{text}</span>
            </p>
            <div className={classes.content}>{children}</div>
        </div>
    )
}

export default TextSection

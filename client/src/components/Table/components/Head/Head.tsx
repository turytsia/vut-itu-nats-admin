import React from 'react'
import { Icon } from '@iconify/react'
import icons from '../../../../utils/icons'

import classes from "./Head.module.css"

type PropsType = {
    children: React.ReactNode
    isSortable?: boolean
    onMouseEnter: () => void
    changeSort: () => void
}

const Head = ({
    children,
    isSortable = true,
    onMouseEnter,
    changeSort
}: PropsType) => {
    return (
        <div className={classes.container} onMouseEnter={onMouseEnter}>
            {children}
            {isSortable && <Icon className={classes.sortIcon} icon={icons.sort} width={12} height={12} onClick={changeSort} />}
        </div>
    )
}

export default Head
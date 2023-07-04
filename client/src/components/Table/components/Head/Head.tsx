import React, { useMemo } from 'react'
import { Icon } from '@iconify/react'
import icons from '../../../../utils/icons'

import classes from "./Head.module.css"
import { sort } from '../../../../hooks/useSort'

type PropsType = {
    children: React.ReactNode
    changeSort: () => void
    isSortable?: boolean
    sort?: sort | null
    order?: number | null
}

const getSortIcon = (sortType: sort) => ({
    [sort.ASC]: icons.sortUp,
    [sort.DESC]: icons.sortDown,
    [sort.DEFAULT]: icons.sort
}[sortType])


const Head = ({
    children,
    isSortable = true,
    sort: sortType = null,
    order = null,
    changeSort
}: PropsType) => {

    return (
        <div className={classes.container}>
            {children}
            <div className={classes.actions}>
                {order && <span className={classes.order}>{order}</span>}
                {(isSortable && sortType) && <Icon className={classes.sortIcon} icon={getSortIcon(sortType)} width={12} height={12} onClick={changeSort} />}
            </div>
        </div>
    )
}

export default Head
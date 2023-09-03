/**
 * @fileoverview Head implementation
 *
 * This file contains implementation of a Head. This component
 * is being used as a head of the table at the Table.tsx
 *
 * @module Head
 * 
 * @author xturyt00
 */

import React from 'react'
import { Icon } from '@iconify/react'
import icons from '../../../../utils/icons'
import { sort } from '../../../../hooks/useSort'

import classes from "./Head.module.css"

/** Component props type */
type PropsType = {
    children: React.ReactNode
    isSortable?: boolean
    sort?: sort | null
    order?: number | null
    changeSort: () => void
}

/**
 * Returns icon representing provided sort state
 * 
 * @param sortType sort state
 * @returns Returns icon
 */
const getSortIcon = (sortType: sort) => ({
    [sort.ASC]: icons.sortUp,
    [sort.DESC]: icons.sortDown,
    [sort.DEFAULT]: icons.sort
}[sortType])

/**
 * Head component, renders head of the table at Table.tsx
 * 
 * @param props Component props
 * @returns Head component
 */
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
                {(isSortable && sortType) &&
                    <Icon className={classes.sortIcon} icon={getSortIcon(sortType)} width={12} height={12} onClick={changeSort} />}
            </div>
        </div>
    )
}

export default Head

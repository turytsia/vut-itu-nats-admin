/**
 * @fileoverview Cell implementation
 *
 * This file contains implementation of a Cell. This component
 * is being used as a cell at the Table.tsx
 *
 * @module Cell
 * 
 * @author xturyt00
 */


import React, { useContext, useMemo } from 'react'

import classes from "./Cell.module.css"
import classNames from 'classnames'
import Skeleton from 'react-loading-skeleton'
import { AppContext } from '../../../../context/AppContextProvider'
import colors from '../../../../utils/colors'

/** Component props type */
type PropsType = {
    children?: React.ReactNode
    className?: string
    isLoading?: boolean
}

/**
 * Cell component, represents cell at Table.tsx
 * 
 * @param props component props
 * @returns Cell component
 */
const Cell = ({
    className,
    children,
    isLoading = false
}: PropsType) => {

    const { isDark } = useContext(AppContext)

    const sekeletonProps = useMemo(
        () => isDark ? { baseColor: colors.darkGray, highlightColor: colors.darkGrayLight } : {},
        [isDark]
    )

    const containerStyles = useMemo(
        () => classNames(classes.container, className, { [classes.dark]: isDark } ),
        [className, isDark]
    )

    return (
        <div className={containerStyles}>
            {isLoading ? <Skeleton highlightColor='' width="100%" height="18px" {...sekeletonProps} /> : children}
        </div>
    )
}

export default Cell
/**
 * @author xturyt00
 */

import React, { useContext, useMemo } from 'react'
import classes from "./BaseCard.module.css"
import { Icon } from '@iconify/react'
import icons from '../../../../utils/icons'
import { Link } from 'react-router-dom'
import Button from '../../../../components/Button/Button'
import { AppContext } from '../../../../context/AppContextProvider'
import colors from '../../../../utils/colors'
import Skeleton from 'react-loading-skeleton'
import classNames from 'classnames'

/**
 * BaseCard component props
 *
 * @typedef {object} PropsType
 *
 * @property {string} [icon] - Icon name
 */
type PropsType = {
    isLoading?: boolean;
} & Partial<{
    icon: icons;
    name: string;
    children: React.ReactNode;
    to: string;
    actions: React.ReactNode;
}>;

/**
 * BaseCard component
 *
 * @param props - Component props
 * @param icon - Icon name
 * @param name - Card name
 * @param children - Card content
 * @param to - Link to
 * @param actions - Card actions
 * @param isLoading - Loading state
 * @constructor
 */
const BaseCard = ({
    icon,
    name,
    children,
    to,
    actions,
    isLoading 
}: PropsType) => {
    /**
     * Hooks
     */

    // theme hook
    const { isDark } = useContext(AppContext)

    // skeleton props
    const sekeletonProps = useMemo(
        () => isDark ? { baseColor: colors.darkGray, highlightColor: colors.darkGrayLight } : {},
        [isDark]
    )

    /**
     * Render
     */
    const containerStyles = classNames(classes.container, {
        [classes.dark]: isDark
    })

    // if loading, render skeleton
    if (isLoading) {
        return (
            <div className={containerStyles}>
                <Skeleton highlightColor={isDark ? "#eee" : ""} containerClassName={classes.skeletonContainer} width="50%" height="20px" {...sekeletonProps} />
                <Skeleton highlightColor={isDark ? "#eee" : ""} containerClassName={classes.skeletonContainer} width="100px" height="100px" {...sekeletonProps} />
                <div className={classes.content}>
                    <Skeleton highlightColor={isDark ? "#eee" : ""} containerClassName={classes.skeletonContainer} width="100%" height="15px" {...sekeletonProps} />
                    <Skeleton highlightColor={isDark ? "#eee" : ""} containerClassName={classes.skeletonContainer} width="100%" height="15px" {...sekeletonProps} />
                    <Skeleton highlightColor={isDark ? "#eee" : ""} containerClassName={classes.skeletonContainer} width="100%" height="15px" {...sekeletonProps} />
                </div>
                <div className={classes.actions}>
                    <Skeleton highlightColor={isDark ? "#eee" : ""} containerClassName={classes.skeletonContainerRight} width="50px" height="20px" {...sekeletonProps} />
                </div>
            </div>
        )
    }

    // render card if not loading
    return (
        <div className={containerStyles}>
            <h4 className={classes.name}>{name}</h4>
            <Icon className={classes.icon} icon={icon ?? ""} />
            <div className={classes.content}>
                {children}
            </div>
            <div className={classes.actions}>
                {actions}
                <Link to={to ?? ""} className={classes.btnDetails}>
                    <Button>
                        <Icon icon={icons.open} height={20} width={20} />
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default BaseCard
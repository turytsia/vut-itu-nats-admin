/**
 * @fileoverview InputContainer component implementation
 *
 * This file contains implementation of a InputContainer component. This is a
 * common component that wraps all the inputs in application
 *
 * @module InputContainer
 * 
 * @author xturyt00
 */
import React from 'react'
import classNames from 'classnames'
import Popover from '../Popover/Popover'

import classes from "./InputContainer.module.css"
import { Icon } from '@iconify/react'
import icons from '../../utils/icons'

type PropsType = {
    children: React.ReactNode
    isFlex?: boolean
    renderLeft?: React.ReactNode
    width?: string
    hintText?: string
    labelText?: string
    isRequired?: boolean
    error?: string
}

/**
 * InputContainer component
 * 
 * @param props - Component props
 * @param props.children - Children
 * @param props.isFlex - Flex container (default = false)
 * @param props.renderLeft - Renders element inside of a container to the left
 * @param props.width - Manually sets width
 * @param props.hintText - Tooltip text
 * @param props.labelText - Label text
 * @param props.isRequired - Require input inside of a container
 * @param props.error - Error text
 * @returns InputContainer component
 */
const InputContainer = ({
    children,
    isFlex = false,
    renderLeft,
    width,
    hintText = "",
    labelText = "",
    isRequired = false,
    error = ""
}: PropsType) => {

    const containerStyles = classNames(classes.container, { [classes.flex]: isFlex })

    return (
        <div className={containerStyles}>
            {renderLeft}
            <label className={classes.label} htmlFor={classes.input}>
                {labelText}
                {isRequired && (
                    <span className={classes.required}>
                        *
                    </span>
                )}
                {hintText && (
                    <Popover element={<span className={classes.hint}>(?)</span>}>
                        {hintText}
                    </Popover>
                )}
            </label>
            <div className={classes.inputContainer} style={{ width }}>
                {children}
                <div className={classes.errorContainer}>
                    {error && (
                        <p className={classes.error}>
                            <Icon icon={icons.error} height={20} width={20} /> {error}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default InputContainer
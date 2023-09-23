/**
 * @fileoverview CopyButton component implementation
 *
 * This file contains implementation of a CopyButton component. 
 * It provides an easy way to copy given text.
 *
 * @module CopyButton
 * 
 * @author xturyt00
 */
import { useState } from 'react'
import { Icon } from "@iconify/react"
import icons from "../../utils/icons"
import Popover from '../Popover/Popover'
import classNames from 'classnames'
import classes from "./CopyButton.module.css"

type PropsType = {
    className?: string
    value: string
}

/**
 * CopyButton component
 * 
 * @param props - Component props
 * @param props.className - Classname
 * @param props.value - Text to copy
 * @returns CopyButton component
 */
const CopyButton = ({
    className = "",
    value,
}: PropsType) => {
    const [isClick, setIsClick] = useState(false)

    const onClick = () => {
        navigator.clipboard.writeText(value)
        setIsClick(true)
    }

    const buttonStyles = classNames(classes.container, className)

    return (
        <button className={buttonStyles} onClick={onClick}>
            {isClick ?
                (
                    <Popover element={<Icon icon={icons.copyCheck} width={20} height={20} />}>
                        Copied!
                    </Popover>
                ) :
                <Icon icon={icons.copy} width={20} height={20} />
            }
        </button>
    )
}

export default CopyButton